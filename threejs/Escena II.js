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
//                            Camara
//----------------------------------------------------------------//
export const Camaras = {
  Orbital: {
    camaraAngulo: 45,
    posicion: [0, 5, 10],
    distanciaMin: 0.1,
    distanciaMax: 1000,
  },
  FirstPerson: {
    camaraAngulo: 75,
    posicion: [0, 1.6, 0],
    distanciaMin: 0.1,
    distanciaMax: 1000,
  },
};
export const createCamara = ({
  camaraAngulo = 45,
  posicion = [0, 5, 10],
  distanciaMin = 0.1,
  distanciaMax = 1000,
  aspect = globalThis.innerWidth / globalThis.innerHeight,
} = {}) => {
  const camara = new THREE.PerspectiveCamera(
    camaraAngulo,
    aspect,
    distanciaMin,
    distanciaMax,
  );
  camara.position.set(...posicion);
  return camara;
};

//----------------------------------------------------------------//
//                            BASICO
//----------------------------------------------------------------//

export const createScene = () => {
  return new THREE.Scene();
};
export const createRenderer = () => {
  return new THREE.WebGLRenderer({ antialias: true });
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
    desplazarXY = false,
    suavizarMove = true,
    rotateAutomatic = false,
    zoom = true,
  } = {},
) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = desplazarXY; // Desplazar X,Y de Camara
  controls.enableDamping = suavizarMove; // Suavizar Movimiento
  controls.autoRotate = rotateAutomatic;
  controls.enableZoom = zoom;
  return controls;
};
