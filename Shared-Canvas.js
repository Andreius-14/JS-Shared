import { make, insertar } from "./Shared-DOM.js";

export function makeCanvas(
  alto = 1000,
  ancho = 500,
  htmlID = "canvas",
  insertaEnBody = false,
) {
  const canvas = make("canvas", "", ["canvas"]); // corregido: "canvas" es un string
  canvas.id = htmlID;
  canvas.width = ancho;
  canvas.height = alto;

  if (document.getElementById(htmlID)) {
    console.warn(`Ya existe un elemento con id="${htmlID}"`);
  }
  if (insertaEnBody) {
    insertar(document.body, canvas);
  }
  return canvas;
}
