// Core
import * as THREE from "three";
import { loadContenedor } from "./Shared-DOM.js";
import { getViewport } from "./Shared-Info.js";
import {
  createCamara,
  createControls,
  createRenderer,
  createStats,
} from "./threejs.js";

//----------------------------------------------------------------//
//                         VARIABLES
//----------------------------------------------------------------//
const { width, height } = getViewport();
const pxLogico = globalThis.devicePixelRatio;

//----------------------------------------------------------------//
//                         COMPONENTES
//----------------------------------------------------------------//
export const scene = new THREE.Scene();
export const camera = createCamara(); //Recomendado (500)
export const renderer = createRenderer();
export const box3D = loadContenedor("Contenedor3D");

// ADDON
export const stats = createStats(box3D);
export const controls = createControls(camera, renderer);

//----------------------------------------------------------------//
//                         EVENTOS
//----------------------------------------------------------------//
globalThis.addEventListener("DOMContentLoaded", initThreeJS);
globalThis.addEventListener("resize", onWindowResize);
globalThis.addEventListener("dblclick", onWindowFullScreen);

function initThreeJS() {
  renderer.setPixelRatio(Math.min(pxLogico, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x111111);
  box3D.appendChild(renderer.domElement);
}

function onWindowResize() {
  camera.aspect = globalThis.innerWidth / globalThis.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(globalThis.innerWidth, globalThis.innerHeight);
}

function onWindowFullScreen() {
  if (!document.fullscreenElement) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
