export function toArray(variable) {
  return Array.isArray(variable) ? variable : variable ? [variable] : [];
}

export function toRadians(value) {
  return Array.isArray(value)
    ? value.map((v) => v * (Math.PI / 180))
    : value * (Math.PI / 180);
}
