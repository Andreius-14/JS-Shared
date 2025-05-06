import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// 🎛️ Tipos de loop disponibles para animaciones
export const LOOP_TYPES = {
  bucle: THREE.LoopRepeat, // Animación infinita
  one: THREE.LoopOnce, // Solo una vez
  pingpong: THREE.LoopPingPong, // Ida y vuelta
};

//----------------------------------------------------------------//
//                     FUNCIONES INTERNAS
//----------------------------------------------------------------//
export const cargarModeloGlb = (
  addToScene,
  ruta,
  { AllElements = false } = {},
) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      ruta,
      (gltf) => {
        addToScene?.add(gltf.scene);
        resolve(AllElements ? gltf : [gltf.scene, gltf.animations]);
      },
      (xhr) => {
        const cargado = (xhr.loaded / xhr.total) * 100;
        console.log(`${cargado.toFixed(2)}% loaded`);
      },
      (error) => {
        console.error(`Error loading ${ruta}:`, error);
        reject(error);
      },
    );
  });
};

//----------------------------------------------------------------//
//                     FUNCIONES INTERNAS
//----------------------------------------------------------------//
// 🦴 Opcional: crea un SkeletonHelper para debug de huesos
export function createSkeletonHelper(escena, modelo3D) {
  const skeleton = new THREE.SkeletonHelper(modelo3D);
  skeleton.visible = false;
  escena?.add(skeleton);
  return skeleton;
}

export function createMixer(modelo3D) {
  return new THREE.AnimationMixer(modelo3D);
}
//----------------------------------------------------------------//
//                     FUNCIONES ANIMACIONES
//----------------------------------------------------------------//
export function groupActionsByName(mixer, animations) {
  // Animaciones -> clips  --> Entonces de Un clip -> action
  // variable
  const actions = {};
  for (const clip of animations) {
    if (clip.name) {
      // Animacion del Clip
      actions[clip.name] = mixer.clipAction(clip);
    }
  }
  return actions;
}
// grupoDeAnimacion = {
//       "animacion1" : mixer.clipAction(clip),
//       "animacion2" : mixer.clipAction(clip),
//       "animacion3" : mixer.clipAction(clip),
//       "animacion4" : mixer.clipAction(clip),
//   }

// 🕹️ Configura las animaciones disponibles a partir de los clips
export function configAnimations(
  animationGroup,
  { tipoDeLoop = LOOP_TYPES.bucle, pausarAlFinalizar = false } = {},
) {
  Object.values(animationGroup).forEach((action) => {
    action.loop = tipoDeLoop;
    action.clampWhenFinished = pausarAlFinalizar;
  });
}

export function enableShadows(model, { cast = true, receive = false } = {}) {
  model.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = cast;
      obj.receiveShadow = receive;
    }
  });
}

function pauseAllActions(actions) {
  actions.forEach(function (action) {
    action.paused = true;
  });
}

function unPauseAllActions(actions) {
  actions.forEach(function (action) {
    action.paused = false;
  });
}

// Ejecuta Todas las Animacion - Recomendaria 1 a la Vez
// pero esto es codigo encontrado y guardado
function activateAllActions(actions) {
  // setWeight(idleAction, settings["modify idle weight"]);
  // setWeight(walkAction, settings["modify walk weight"]);
  // setWeight(runAction, settings["modify run weight"]);

  actions.forEach(function (action) {
    action.play();
  });
}

function deactivateAllActions(actions) {
  actions.forEach((action) => {
    action.stop();
  });
}
//----------------------------------------------------------------//
//              OBJETO UNIFICADOR DE ANIMACIONES
//----------------------------------------------------------------//
export const Model = {
  loops: LOOP_TYPES,
  // Nombre Puros
  createMixer,
  groupActionsByName,
  configAnimations,
  createSkeletonHelper,
  enableShadows,
  // Minimalista
  load: cargarModeloGlb,
  mixer: createMixer,
  skeletonHelper: createSkeletonHelper,
  groupAnimation: groupActionsByName,
};
