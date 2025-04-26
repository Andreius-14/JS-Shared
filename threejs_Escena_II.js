import * as THREE from "three";

// Componentes
import { scene, camera, renderer, box3D } from "./threejs_Escena_I.js";

// Librerias
import Stats from "three/addons/libs/stats.module.js"; // Informacion de Consumo
import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // Control de Camara - Sensilla
import { worldColor } from "../JS-Shared/Shared-Const.js";
//------------------------------------------------------------------------------//

//------------------------------------------------------------------------------//

// CONSUMO [animate()]
export const stats = new Stats();
box3D.appendChild(stats.dom);

// CONTROLS [animate()]
export const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false; // Desplazar X,Y de Camara
controls.enableDamping = true; // Suavizar Movimiento

//  controls.target.set(0, 0.5, 0);  // POsicion de Inicio
//  controls.autoRotate = true;

//------------------------------------------------------------------------------//

// EVENTO - AUTOAJUSTAR - [No requiere ser importado]
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
globalThis.addEventListener("resize", onWindowResize);

// EVENTO - FULLSCREEN
globalThis.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    renderer.domElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
