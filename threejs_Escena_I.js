// Librerias
import * as THREE from "three";
import { make, insertar, enlaceId } from "./Shared-DOM.js";

//----------------------------------------------------------------//
//                         VARIABLES
//----------------------------------------------------------------//
const w = globalThis.innerWidth;
const h = globalThis.innerHeight;
const pxLogico = globalThis.devicePixelRatio;
// Constantes
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000); //Recomendado (500)
export const renderer = new THREE.WebGLRenderer({ antialias: true });

export let box3D = MakeContenedorThreejs("Contenedor3D");

// PROPIEDADES
document.addEventListener("DOMContentLoaded", () => {
  // Propiedades
  camera.position.set(0, 0, 5);

  renderer.setPixelRatio(Math.min(pxLogico, 2));
  renderer.setSize(w, h);
  renderer.setClearColor(0x111111); // Una mejora Vizual - No afecta la Iluminacion

  box3D.appendChild(renderer.domElement);
});

//----------------------------------------------------------------//
//                   FUNCIONES - PUBLICAS
//----------------------------------------------------------------//
function MakeContenedorThreejs(
  idContenedor = "",
  insertarEnBody = true,
  idPadre = "",
) {
  //Verifica Existencia
  let contenedor = enlaceId(idContenedor);

  // En Caso No Exite
  if (!contenedor) {
    contenedor = make("div", "", [], idContenedor);

    if (idPadre) {
      const padreElemento = enlaceId(idPadre);
      insertar(padreElemento || document.body, contenedor);
    }
    if (insertarEnBody) {
      insertar(document.body, contenedor);
    }
  }

  return contenedor;
}
