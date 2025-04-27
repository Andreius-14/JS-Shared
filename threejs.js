import * as THREE from "three";
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

export const Camara = {
  Orbital: () => createCamara(45, [0, 5, 10]),
  FirstPerson: () => createCamara(75, [0, 1.6, 0]),
};
//----------------------------------------------------------------//
//                            BASICO
//----------------------------------------------------------------//
export const createCamara = (
  camaraAngulo = 45,
  camaraPosicion = [0, 5, 10],
  distanciaMin = 0.1,
  distanciaMax = 1000,
  aspect = globalThis.innerWidth / globalThis.innerHeight,
) => {
  const camara = new THREE.PerspectiveCamera(
    camaraAngulo,
    aspect,
    distanciaMin,
    distanciaMax,
  );
  camara.position.set(...camaraPosicion);

  return camara;
};

export const createRenderer = () =>
  new THREE.WebGLRenderer({ antialias: true });
//----------------------------------------------------------------//
//                            ADDON
//----------------------------------------------------------------//
export const createStats = (container) => {
  const stats = new Stats();
  container.appendChild(stats.dom);
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
