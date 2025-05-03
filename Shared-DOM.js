//----------------------------------------------------------------//
//                         NIVEL: FACIL
//----------------------------------------------------------------//
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
//----------------------------------------------------------------//
//                         NIVEL: MEDIO
//----------------------------------------------------------------//

// --> Creacion Simple de Objetos Html
export function make(tag, text = "", classes = [], id = "") {
  // Objeto
  const element = document.createElement(tag);
  // Propiedades
  if (id) element.id = id;
  if (text) element.textContent = text; // Usar textContent para texto plano
  if (classes.length > 0) element.classList.add(...classes);

  return element;
}

// --> Crea un Contenedor y Inserta en el Html
export function loadContenedor(
  idContenedor = "container",
  idPadre = "",
  deseaInsertar = true,
) {
  //EnlaceID
  const boxDad = enlaceId(idPadre) || document.body;
  const boxChild = enlaceId(idContenedor) || make("div", "", [], idContenedor);

  if (deseaInsertar) insertar(boxDad, boxChild);

  return boxChild;
}
