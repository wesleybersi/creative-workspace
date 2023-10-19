export function oneIn(chance: number) {
  if (!Math.floor(Math.random() * chance)) return true;
  return false;
}

export function random(chance: number) {
  return Math.floor(Math.random() * chance);
}

export function getColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (25 + 70 * Math.random()) +
    "%," +
    (85 + 10 * Math.random()) +
    "%)"
  );
}
