//----------------------------------------------------------------//
//                         NIVEL: FACIL
//----------------------------------------------------------------//
//[01]
export function enlaceId(id = "") {
  const element = document.getElementById(id);
  return element ? element : null;
}

export function enlaceClass(clase = "") {
  const elements = document.getElementsByClassName(clase);
  return elements.length ? elements : null;
}

//[02]
export function enlaceCss(regla = "", all = false) {
  const element = all
    ? document.querySelectorAll(regla)
    : document.querySelector(regla);
  return element || null;
}

//----------------------------------------------------------------//
//                         NIVEL: Accion
//----------------------------------------------------------------//
export function _insertar(padre, hijo) {
  if (padre && hijo) padre.appendChild(hijo);
  else console.warn("insertar(): faltan nodo padre o hijo válidos");
}

//----------------------------------------------------------------//
//                         NIVEL: Bool
//----------------------------------------------------------------//
export function _idDisponible(id) {
  const el = enlaceId(id);
  if (el) {
    console.warn(`ID "${id}" ya está en uso`, el);
    return false;
  }
  return true;
}

//----------------------------------------------------------------//
//                         NIVEL: MEDIO
//----------------------------------------------------------------//

export function makeHtml(tag = "", { id = "", classes = [], txt = "" } = {}) {
  //Bool
  if (id && !_idDisponible(id)) return null;
  //Make
  const element = document.createElement(tag);
  //Propiedades Opcionales
  if (id) element.id = id;
  if (txt) element.textContent = txt;
  if (classes.length > 0) element.classList.add(...classes);
  return element;
}
