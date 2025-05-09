import * as THREE from "three";
import { loadContenedor } from "../../Shared-DOM.js";
import { camara } from "./Camara.js";
// Addons
import Stats from "three/addons/libs/stats.module.js"; // Consumo
import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // Control de Camara
//┌────────────────────┬───────────────────┬──────────────────────────────┐
//│ Tipo de Vista      │ fov Recomendado   │ Efecto                       │
//├────────────────────┼───────────────────┼──────────────────────────────┤
//│ Vista humana       │ 45-55             │ Perspectiva natural          │
//│ Zoom cercano       │ 20-30             │ Efecto telescópico           │
//│ Vista amplia       │ 60-85             │ Gran angular (distorsión)    │
//│ Juegos 1ra persona │ 60-90             │ Balance realismo/visibilidad │
//└────────────────────┴───────────────────┴──────────────────────────────┘

//----------------------------------------------------------------//
//                            BASICO
//----------------------------------------------------------------//

export const createScene = () => {
  return new THREE.Scene();
};
export const createRenderer = ({ sombra = false } = {}) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = sombra;
  return renderer;
};

export const createContenedor = (id = "container", idPadreOpcional = "") => {
  return loadContenedor(id, idPadreOpcional);
};

export const createCamara = camara.Perspective;
export const loadCamara = camara;
//----------------------------------------------------------------//
//                            ADDON
//----------------------------------------------------------------//
export const createStats = (container, insertar = true) => {
  const stats = new Stats();
  if (insertar) container.appendChild(stats.dom);
  return stats;
};

export const createControls = (
  camera,
  renderer,
  {
    objetivo,
    desplazarXY = false,
    suavizarMove = true,
    rotateAutomatic = false,
    zoom = true,
  } = {},
) => {
  // Guarda la rotación ANTES de crear OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = desplazarXY; // Desplazar X,Y de Camara
  controls.enableDamping = suavizarMove; // Suavizar Movimiento
  controls.autoRotate = rotateAutomatic;
  controls.enableZoom = zoom;
  if (objetivo) controls.target.set(...objetivo);
  return controls;
};

//----------------------------------------------------------------//
//                      Configuracion
//----------------------------------------------------------------//

// config.js
export const config_Estilos = () => {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.overflow = "hidden"; // Evita scrollbars
};

export const config_Renderer = (renderer, container) => {
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio, 2));
  renderer.setSize(globalThis.innerWidth, globalThis.innerHeight);
  renderer.setClearColor(0x111111);
  container.appendChild(renderer.domElement);
};
// Obsoleto usar settAnimationLoop fuera de esta function
// requestAnimationFrame(animate);
export const config_Animation = (renderer, funcionAnimateName) => {
  renderer.setAnimationLoop(funcionAnimateName); // Inicia
  //renderer.setAnimationLoop(null);  // Detiene
};
