export function toRoman(n: number): string {
  const map: [number, string][] = [[1000,'M'],[500,'D'],[100,'C'],[50,'L'],[10,'X'],[5,'V'],[1,'I']];
  let res = '';
  for (const [val, sym] of map) {
    while (n >= val) {
      res += sym;
      n -= val;
    }
  }
  return res;
}