export function toRoman(n: number): string {
  const values = [1000, 500, 100, 50, 10, 5, 1];
  const symbols = ["M", "D", "C", "L", "X", "V", "I"];
  let result = "";
  for (let i = 0; i < values.length; i++) {
    while (n >= values[i]) {
      result += symbols[i];
      n -= values[i];
    }
  }
  return result;
}