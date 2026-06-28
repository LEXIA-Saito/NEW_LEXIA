#!/usr/bin/env bash
# Daily LEXIA blog article generator.
#
# Runs headless Claude inside an ISOLATED git worktree (detached origin/main) so the
# owner's working tree and any uncommitted local changes are never touched. Claude
# writes one article, creates a `blog/<date>-<slug>` branch, and opens a PR.
#
# Usage:
#   scripts/blog/generate-daily-article.sh            # full run (branch + PR)
#   scripts/blog/generate-daily-article.sh --dry-run  # validate env + dedup + worktree only
#
# No credentials are stored here. Claude uses its own authenticated session; gh uses
# the machine's existing login. Optional microCMS dedup reads MICROCMS_* from the env.
set -euo pipefail

REPO_DIR="${LEXIA_REPO_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
WORK_ROOT="${LEXIA_BLOG_HOME:-$HOME/.lexia-blog}"
LOG_DIR="$WORK_ROOT/logs"
WT_ROOT="$WORK_ROOT/worktrees"
BASE_REF="origin/main"
PROMPT_FILE="$REPO_DIR/scripts/blog/daily-article.prompt.md"

DRY_RUN=0
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

mkdir -p "$LOG_DIR" "$WT_ROOT"
TODAY="$(TZ=Asia/Tokyo date +%F)"
LOG_FILE="$LOG_DIR/generate-$TODAY.log"
exec > >(tee -a "$LOG_FILE") 2>&1

log() { echo "[$(TZ=Asia/Tokyo date '+%Y-%m-%d %H:%M:%S %Z')] $*"; }

log "=== daily article generation start (dry_run=$DRY_RUN, today=$TODAY) ==="
cd "$REPO_DIR"

for bin in git gh; do
  command -v "$bin" >/dev/null || { log "required tool not found: $bin"; exit 1; }
done

git fetch origin main --quiet
REPO_SLUG="$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null || echo '')"
log "repo: ${REPO_SLUG:-unknown}"

# --- Duplicate guard: skip if today's article already exists (branch or waiting PR) ---
existing_branch="$(git ls-remote --heads origin "blog/$TODAY-*" || true)"
existing_pr="$(gh pr list --state open --label blog:article --json body \
  --jq "[.[] | select(.body | contains(\"${TODAY}T18:00:00+09:00\"))] | length" 2>/dev/null || echo 0)"
if [[ -n "$existing_branch" || "${existing_pr:-0}" != "0" ]]; then
  log "本日分（ブランチまたは公開待ちPR）が既に存在するため、重複作成を避けて終了します。"
  exit 0
fi

# --- Isolated worktree on a detached origin/main ---
WT="$WT_ROOT/$TODAY"
git worktree remove --force "$WT" 2>/dev/null || true
rm -rf "$WT"
git worktree add --detach "$WT" "$BASE_REF" >/dev/null
log "isolated worktree ready: $WT (detached $BASE_REF)"

cleanup() { cd "$REPO_DIR"; git worktree remove --force "$WT" 2>/dev/null || true; }
trap cleanup EXIT

if [[ "$DRY_RUN" == "1" ]]; then
  log "dry-run OK: 環境・重複チェック・分離worktree生成まで確認しました。"
  log "would run: claude -p <scripts/blog/daily-article.prompt.md> inside $WT"
  exit 0
fi

command -v claude >/dev/null || { log "claude CLI not found in PATH"; exit 1; }
command -v pnpm   >/dev/null || { log "pnpm not found in PATH";       exit 1; }
[[ -f "$PROMPT_FILE" ]] || { log "prompt file missing: $PROMPT_FILE"; exit 1; }

log "installing dependencies in worktree…"
( cd "$WT" && pnpm install --frozen-lockfile --prefer-offline >/dev/null 2>&1 ) \
  || log "pnpm install warning (continuing; Claude can retry)"

cd "$WT"
log "invoking headless Claude…"
set +e
claude -p "$(cat "$PROMPT_FILE")" --dangerously-skip-permissions
RC=$?
set -e
log "claude exited rc=$RC"
log "=== daily article generation end (rc=$RC) ==="
exit "$RC"
