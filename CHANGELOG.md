# Changelog

All notable changes to this project will be documented in this file.

## 2025-10-10

### Added
- Added `heroImageAlt` and `sections[].imageAlt` fields to blog post data types (`lib/blog-posts.types.ts`).
- Populated `heroImageAlt` and `imageAlt` for existing fallback blog posts (`lib/blog-posts-fallback.ts`).

### Changed
- Updated blog article page renderer to prefer explicit alt fields for OG/meta and `<Image>` elements (`app/blog/[slug]/page.tsx`).

### Rationale
- Improve accessibility (screen readers) and Open Graph metadata quality for social previews.

### Verification
- Static type checks passed for modified files. Please run `pnpm dev` locally and inspect article pages to verify rendered `alt` attributes and OG previews.
