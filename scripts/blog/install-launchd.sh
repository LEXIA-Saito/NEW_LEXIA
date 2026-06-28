#!/usr/bin/env bash
# Install / manage the daily blog-article LaunchAgent (macOS launchd).
#
#   scripts/blog/install-launchd.sh install     # render + load the agent (09:00 JST daily)
#   scripts/blog/install-launchd.sh uninstall   # unload + remove the agent
#   scripts/blog/install-launchd.sh status      # show whether it's loaded
#   scripts/blog/install-launchd.sh run         # trigger one generation run now
#   scripts/blog/install-launchd.sh dry-run     # trigger a dry-run now (no Claude/PR)
#   scripts/blog/install-launchd.sh logs        # tail today's generation log
#
# No credentials are written. The agent runs the machine's authenticated `claude`/`gh`.
set -euo pipefail

LABEL="com.lexia.blog-daily-article"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SCRIPT="$REPO_DIR/scripts/blog/generate-daily-article.sh"
TEMPLATE="$REPO_DIR/ops/launchd/com.lexia.blog-daily-article.plist.template"
PLIST_DST="$HOME/Library/LaunchAgents/$LABEL.plist"
WORK_ROOT="${LEXIA_BLOG_HOME:-$HOME/.lexia-blog}"
LOG_DIR="$WORK_ROOT/logs"
DOMAIN="gui/$(id -u)"

build_path() {
  local dirs=()
  for bin in git gh pnpm node claude; do
    local resolved
    resolved="$(command -v "$bin" 2>/dev/null || true)"
    [[ -n "$resolved" ]] && dirs+=("$(dirname "$resolved")")
  done
  dirs+=("/opt/homebrew/bin" "/usr/local/bin" "/usr/bin" "/bin" "/usr/sbin" "/sbin" "$HOME/.claude/local")
  printf "%s\n" "${dirs[@]}" | awk '!seen[$0]++' | paste -sd ":" -
}

cmd_install() {
  [[ -f "$TEMPLATE" ]] || { echo "template missing: $TEMPLATE" >&2; exit 1; }
  command -v claude >/dev/null || echo "WARNING: 'claude' not found in PATH — the agent will fail until Claude Code CLI is installed." >&2
  mkdir -p "$LOG_DIR" "$(dirname "$PLIST_DST")"
  chmod +x "$SCRIPT"

  local launchd_path
  launchd_path="$(build_path)"
  sed \
    -e "s#__SCRIPT__#$SCRIPT#g" \
    -e "s#__WORKDIR__#$REPO_DIR#g" \
    -e "s#__PATH__#$launchd_path#g" \
    -e "s#__STDOUT__#$LOG_DIR/launchd.out.log#g" \
    -e "s#__STDERR__#$LOG_DIR/launchd.err.log#g" \
    "$TEMPLATE" > "$PLIST_DST"

  launchctl bootout "$DOMAIN/$LABEL" 2>/dev/null || true
  launchctl bootstrap "$DOMAIN" "$PLIST_DST"
  launchctl enable "$DOMAIN/$LABEL"
  echo "installed + loaded: $LABEL (daily 09:00 local time)"
  echo "plist: $PLIST_DST"
  echo "PATH: $launchd_path"
}

cmd_uninstall() {
  launchctl bootout "$DOMAIN/$LABEL" 2>/dev/null || true
  rm -f "$PLIST_DST"
  echo "uninstalled: $LABEL"
}

cmd_status() {
  if launchctl print "$DOMAIN/$LABEL" >/dev/null 2>&1; then
    echo "loaded: $LABEL"
    launchctl print "$DOMAIN/$LABEL" | grep -E "state|run interval|next firing|program =|last exit" || true
  else
    echo "not loaded: $LABEL"
  fi
}

cmd_run()     { launchctl kickstart -k "$DOMAIN/$LABEL" && echo "triggered a run; see logs"; }
cmd_dry_run() { "$SCRIPT" --dry-run; }
cmd_logs()    { tail -n 80 -f "$LOG_DIR/generate-$(TZ=Asia/Tokyo date +%F).log" 2>/dev/null || echo "no log yet for today"; }

case "${1:-}" in
  install)   cmd_install ;;
  uninstall) cmd_uninstall ;;
  status)    cmd_status ;;
  run)       cmd_run ;;
  dry-run)   cmd_dry_run ;;
  logs)      cmd_logs ;;
  *) echo "usage: $0 {install|uninstall|status|run|dry-run|logs}" >&2; exit 1 ;;
esac
