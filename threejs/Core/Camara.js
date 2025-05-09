import * as THREE from "three";

//----------------------------------------------------------------//
//                            Camara
//----------------------------------------------------------------//

export const camara = {
  // 🎯 Vistas predefinidas (instancias directas)
  Basica: () => createCameraPerspective(configCamera.Principal),
  FirstPerson: () => createCameraPerspective(configCamera.FirstPerson),
  ThirdPerson: () => createCameraPerspective(configCamera.ThirdPerson),
  Lateral: () => createCameraPerspective(configCamera.Lateral),
  Cinematica: () => createCameraPerspective(configCamera.Cinematica),

  // 🗺️ Vistas ortográficas
  MiniMapa: () => createCameraOrthographic(configCamera.Minimapa),
  TopEditor: () => createCameraOrthographic(configCamera.TopEditor),
  Isometrica: () => createCameraOrthographic(configCamera.Isometrica),

  // 🛠️ Crear cámaras personalizadas
  Perspective: createCameraPerspective,
  Orthographic: createCameraOrthographic,
};

const configCamera = {
  // 🎯 Vista general
  Principal: {
    posicion: [0, 5, 10],
    pov: 45,
    near: 0.1,
    far: 1000,
  },

  // 👤 Primera persona
  FirstPerson: {
    posicion: [0, 1.6, 0],
    pov: 75,
    near: 0.1,
    far: 1000,
  },

  // 🗺️ Vista cenital (minimapa)
  Minimapa: {
    posicion: [0, 50, 0],
    rotacion: [Math.PI, 0, 0],
    left: -50,
    right: 50,
    top: 50,
    bottom: -50,
    near: 0.1,
    far: 100,
  },

  // 🧍‍♂️ Tercera persona (detrás del personaje)
  ThirdPerson: {
    posicion: [0, 3, -6],
    pov: 60,
    near: 0.1,
    far: 1000,
  },

  // 📐 Vista lateral
  Lateral: {
    posicion: [10, 2, 0],
    objetivo: [0, 2, 0],
    pov: 45,
    near: 0.1,
    far: 1000,
  },

  // 🧭 Vista superior ortográfica (editor/mapa)
  TopEditor: {
    posicion: [0, 100, 0],
    rotacion: [-Math.PI / 2, 0, 0],
    left: -100,
    right: 100,
    top: 100,
    bottom: -100,
    near: 0.1,
    far: 500,
  },

  // 🔺 Vista isométrica
  Isometrica: {
    posicion: [30, 30, 30],
    objetivo: [0, 0, 0],
    left: -50,
    right: 50,
    top: 50,
    bottom: -50,
    near: 0.1,
    far: 1000,
  },

  // 🎞️ Cámara para cinemáticas
  Cinematica: {
    posicion: [20, 10, 20],
    objetivo: [0, 0, 0],
    pov: 35,
    near: 0.1,
    far: 2000,
  },
};

function createCameraPerspective({
  posicion = [-5, 3, 10],
  objetivo = [0, 2, 0],
  pov = 45,
  near = 0.2,
  far = 100,
  aspect = globalThis.innerWidth / globalThis.innerHeight,
} = {}) {
  const camara = new THREE.PerspectiveCamera(pov, aspect, near, far);
  camara.position.set(...posicion);
  camara.lookAt(...objetivo);
  return camara;
}

function createCameraOrthographic({
  posicion = [0, 50, 0], // Vista cenital
  rotacion = [Math.PI, 0, 0], // Rotación para corregir orientación
  objetivo = null,
  left = -50,
  right = 50,
  top = 50,
  bottom = -50,
  near = 0.1,
  far = 100,
} = {}) {
  const camera = new THREE.OrthographicCamera(
    left,
    right,
    top,
    bottom,
    near,
    far,
  );

  camera.position.set(...posicion);

  objetivo
    ? camera.lookAt(new THREE.Vector3(...objetivo))
    : camera.rotation.set(...rotacion); // Prioriza target sobre rotation si está definido

  return camera;
}
