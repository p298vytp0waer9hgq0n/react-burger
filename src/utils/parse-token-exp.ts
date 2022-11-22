export default function parseTokenExp(token: string) {
  const a = token.indexOf('.');
  const b = token.indexOf('.', a + 1);
  return JSON.parse(atob(token.slice(a + 1, b))).exp * 1000;
}
