function make(tag, text = "", classes = []) {
  const element = document.createElement(tag);
  if (text) {
    element.textContent = text; // Usar textContent para texto plano
  }
  if (classes.length > 0) {
    element.classList.add(...classes);
  }
  return element;
}

function insertar(padre, hijo) {
  padre.appendChild(hijo);
}
