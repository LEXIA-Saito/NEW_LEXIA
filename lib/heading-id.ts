// NOTE: This file is intentionally free of any React / client-only imports
// so it can be used safely from both Server and Client Components.
// Heading text -> stable fragment id generator.
export function generateHeadingId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\w\u00C0-\u024f\s-]/g, "") // allow unicode letters, remove symbols
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
}
