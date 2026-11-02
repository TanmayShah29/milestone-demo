// The initials of a name: "Ada Lovelace" gives "AL". Empty or blank input gives "".
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}
