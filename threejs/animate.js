import * as THREE from "three";

// 🎛️ Tipos de loop disponibles para animaciones
export const LOOP_TYPES = {
  bucle: THREE.LoopRepeat, // Animación infinita
  one: THREE.LoopOnce, // Solo una vez
  pingpong: THREE.LoopPingPong, // Ida y vuelta
};
//----------------------------------------------------------------//
//                     FUNCIONES BASICO
//----------------------------------------------------------------//

export function createMixer(modelo3D) {
  return new THREE.AnimationMixer(modelo3D);
}

export function createClock() {
  return new THREE.Clock();
}

//----------------------------------------------------------------//
//                     FUNCIONES INTERNAS
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
//----------------------------------------------------------------//
//                          ACTIONS
//----------------------------------------------------------------//
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

function activateAllActions(actions) {
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
export const Anime = {
  // Directo
  createMixer,
  groupActionsByName,
  configAnimations,
  // Minimalista
  Mixer: createMixer,
  Clock: createClock,
  groupAnimation: groupActionsByName,
};
