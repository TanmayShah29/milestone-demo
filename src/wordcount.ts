/**
 * Counts the words in a string. Words are separated by any whitespace (spaces, tabs, newlines);
 * leading and trailing whitespace is ignored, so empty or whitespace-only input counts as 0.
 * Hyphenated words such as "well-known" count as one word, since they contain no whitespace.
 */
export function wordCount(text: string): number {
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}
