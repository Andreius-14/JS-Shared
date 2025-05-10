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
//                            Core
//----------------------------------------------------------------//
export const createContenedor = loadContenedor;
export const createCamara = camara.Perspective;

export const createScene = () => new THREE.Scene();

export const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  return renderer;
};

//----------------------------------------------------------------//
//                            ADDON
//----------------------------------------------------------------//
export const createStats = (container, insertar = true) => {
  const stats = new Stats();
  if (insertar) container.appendChild(stats.dom);
  return stats;
};

export const createControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  return controls;
};

//----------------------------------------------------------------//
//                            Camara
//----------------------------------------------------------------//

export const create = {
  // Core
  scene: createScene,
  renderer: createRenderer,
  contenedor: createContenedor,
  // Addons
  stats: createStats,
  controls: createControls,
  // Camara
  camera: createCamara,
  loadCamara: camara,
};

//----------------------------------------------------------------//
//                      Configuracion
//----------------------------------------------------------------//
// Configuracion Basica -- Para Estilos CSS
export const config_Estilos = () => {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.overflow = "hidden"; // Evita scrollbars
};

// Configuracion Basica -- Para Renderer
export const config_Renderer = (renderer, container) => {
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio, 2));
  renderer.setSize(globalThis.innerWidth, globalThis.innerHeight);
  renderer.setClearColor(0x111111);
  container.appendChild(renderer.domElement);
};

export const config_controls = (
  controls,
  { zoom = true, soft = true, stopFloor = true } = {},
) => {
  controls.enableZoom = zoom;
  controls.enableDamping = soft; // Suavizar Movimiento
  if (stopFloor) controls.maxPolarAngle = Math.PI / 2;
};

// Configuracionn Basica -- Para Animacion
export const config_Animation = (renderer, funcionAnimateName) => {
  renderer.setAnimationLoop(funcionAnimateName); // Inicia
  //renderer.setAnimationLoop(null);  // Detiene
  // Obsoleto usar settAnimationLoop fuera de esta function
  // requestAnimationFrame(animate);
};

//----------------------------------------------------------------//
//                      EXTRA
//----------------------------------------------------------------//
export const extra_controls = (
  controls,
  { min, max, objetivo, desplazarXY = false, rotate = false } = {},
) => {
  controls.enablePan = desplazarXY;
  controls.autoRotate = rotate;

  if (min) controls.minDistance = min;
  if (max) controls.maxDistance = max;
  if (objetivo) controls.target.set(...objetivo);
  controls.update();
};

export const extra_renderer = (renderer, { sombra = false } = {}) => {
  renderer.shadowMap.enabled = sombra;
};

//----------------------------------------------------------------//
//                      UNIFICADOR
//----------------------------------------------------------------//

export const config = {
  Estilos: config_Estilos,
  Renderer: config_Renderer,
  Animation: config_Animation,
  Controls: config_controls,
};

export const extra = {
  Controls: extra_controls,
  Renderer: extra_renderer,
};
