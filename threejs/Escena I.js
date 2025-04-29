// Core
import * as THREE from "three";
import {
  createCamara,
  createContenedor,
  createControls,
  createRenderer,
  createScene,
  createStats,
} from "./Escena II.js";

//----------------------------------------------------------------//
//                         INIT
//----------------------------------------------------------------//
export const scene = createScene();
export const camera = createCamara(); //Recomendado (500)
export const renderer = createRenderer();
export const box3D = createContenedor("Contenedor3D");
// ADDON
export const stats = createStats(box3D);
export const controls = createControls(camera, renderer);

//----------------------------------------------------------------//
//                         Eventos
//----------------------------------------------------------------//
function initThreeJS() {
  // Evita Bordes Blancos
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  // Logica Threejs
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio, 2));
  renderer.setSize(globalThis.innerWidth, globalThis.innerHeight);
  renderer.setClearColor(0x111111);
  box3D.appendChild(renderer.domElement);
}

function eventoResize() {
  camera.aspect = globalThis.innerWidth / globalThis.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(globalThis.innerWidth, globalThis.innerHeight);
}

function eventoFullScreen() {
  if (!document.fullscreenElement) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

//----------------------------------------------------------------//
//                         Listener
//----------------------------------------------------------------//
globalThis.addEventListener("DOMContentLoaded", initThreeJS);
globalThis.addEventListener("resize", eventoResize);
globalThis.addEventListener("dblclick", eventoFullScreen);
