import * as THREE from "three";
import { loadContenedor } from "../Shared-DOM.js";
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
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Opcional: sombras más suaves // Predeterminado
  return renderer;
};

export const createContenedor = (id = "container", idPadreOpcional = "") => {
  return loadContenedor(id, idPadreOpcional);
};

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
//                            Camara
//----------------------------------------------------------------//
export const Camaras = {
  Principal: {
    tipo: "Perspective",
    angulo: 45,
    posicion: [0, 5, 10], // [6, 8, 14],Posición más común para vista general
    near: 0.1,
    far: 1000,
  },
  FirstPerson: {
    tipo: "Perspective",
    angulo: 75,
    posicion: [0, 1.6, 0],
    near: 0.1,
    far: 1000,
  },
  Minimapa: {
    tipo: "Orthographic",
    left: -50,
    right: 50,
    top: 50,
    bottom: -50,
    near: 0.1,
    far: 100,
    posicion: [0, 50, 0], // Vista cenital
    rotacion: [Math.PI, 0, 0], // Rotación para corregir orientación
  },
};
export const createCamara = (
  pov = 45,
  near = 0.2,
  far = 100,
  posicion = [-5, 3, 10],
  objetivo = [0, 2, 0],
) => {
  const aspect = globalThis.innerWidth / globalThis.innerHeight;
  const camara = new THREE.PerspectiveCamera(pov, aspect, near, far);
  camara.position.set(...posicion);
  camara.lookAt(...objetivo);
  return camara;
};
//export const createCamaraPredeterminada = ({
//  config = Camaras.Principal,
//} = {}) => {
//  let camara;
//
//  if (config.tipo === "Perspective") {
//    camara = new THREE.PerspectiveCamera(
//      config.angulo, // Para compatibilidad con tu código antiguo
//      globalThis.innerWidth / globalThis.innerHeight,
//      config.near,
//      config.far,
//    );
//  }
//  if (config.tipo === "Orthographic") {
//    camara = new THREE.OrthographicCamera(
//      config.left,
//      config.right,
//      config.top,
//      config.bottom,
//      config.near,
//      config.far,
//    );
//  }
//
//  camara.position.set(...config.posicion);
//  if (config.rotacion) camara.rotation.set(...config.rotacion);
//  return camara;
//};

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

export const config_Animation = (renderer, funcionAnimateName) => {
  renderer.setAnimationLoop(funcionAnimateName); // Inicia
  //renderer.setAnimationLoop(null);  // Detiene
};
