export function make(tag, text = "", classes = [], id = "") {
  const element = document.createElement(tag);
  if (text) {
    element.textContent = text; // Usar textContent para texto plano
  }
  if (classes.length > 0) {
    element.classList.add(...classes);
  }
  if (id) {
    element.id = id;
  }
  return element;
}

export function insertar(padre, hijo) {
  padre.appendChild(hijo);
}

export function enlaceId(id = "") {
  const element = document.getElementById(id);
  return element ? element : null;
}

export function enlaceClass(clase = "") {
  const element = document.getElementsByClassName(clase);
  return element ? element : null;
}
//if (MakeHtml) {
//  const etiquetaPadre = document.body;
//  const etiquetaHijo = make("div", "", [], id);
//  insertar(etiquetaPadre, etiquetaHijo);
//}
