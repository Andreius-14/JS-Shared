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
export function groupMixerClipAction(mixer, animations) {
  // variable
  const actions = {};
  for (const clip of animations) {
    if (clip.name) {
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

//----------------------------------------------------------------//
//              OBJETO UNIFICADOR DE ANIMACIONES
//----------------------------------------------------------------//
export const Model = {
  loops: LOOP_TYPES,
  // Nombre Puros
  createMixer,
  groupMixerClipAction,
  configAnimations,
  createSkeletonHelper,
  // Minimalista
  load: cargarModeloGlb,
  mixer: createMixer,
  skeletonHelper: createSkeletonHelper,
  groupAnimation: groupMixerClipAction,
};
