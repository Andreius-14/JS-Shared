export const _isHTML = (nodo) => nodo instanceof HTMLElement;

export function _idDisponible(id) {
  const el = document.getElementById(id);
  if (!el) return true;
  console.warn(`ID "${id}" ya está en uso`, el);
  return false;
}


export function esString(valor) {
  return typeof valor === "string" || valor instanceof String;
}
