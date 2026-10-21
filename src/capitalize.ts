export function capitalize(input: string): string {
  return input
    .trim()
    .split(/(\s+)/)
    .map((w) => (/\s/.test(w) || !w ? w : w[0]!.toUpperCase() + w.slice(1).toLowerCase()))
    .join("");
}
