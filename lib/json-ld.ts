/**
 * Serialize a value for embedding inside a <script type="application/ld+json"> tag.
 *
 * JSON.stringify does not escape "<", so a value containing "</script>" (or "<!--")
 * could break out of the script element. Escaping "<" as its unicode form keeps the
 * JSON valid while making element-breakout impossible, hardening the JSON-LD output
 * against injection if any field ever contains untrusted data.
 */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
