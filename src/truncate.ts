/**
 * Shortens text to at most `max` characters. Text that already fits is returned unchanged; longer text
 * keeps its first `max - 1` characters and ends with a single ellipsis (…), so the result is exactly `max`
 * characters long.
 * @throws RangeError when `max` is less than 1.
 */
export function truncate(text: string, max: number): string {
  if (!(max >= 1)) throw new RangeError(`max must be at least 1, got ${max}`);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}
