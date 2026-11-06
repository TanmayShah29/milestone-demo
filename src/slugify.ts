/**
 * Turns any string into a URL slug: lowercase ASCII letters and digits separated by single hyphens.
 * Accented letters are transliterated (é → e, ü → u); everything else becomes a separator.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip combining accents left by NFKD (é → e)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
