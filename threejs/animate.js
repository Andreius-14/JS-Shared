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
// animationGroup = {
//       "animacion1" : mixer.clipAction(clip),
//       "animacion2" : mixer.clipAction(clip),
//       "animacion3" : mixer.clipAction(clip),
//       "animacion4" : mixer.clipAction(clip),
//   }

// 🕹️ Configura las animaciones disponibles a partir de los clips
export function configAnimations(
  target,
  tipoDeLoop = LOOP_TYPES.bucle,
  pausarAlFinalizar = false,
) {
  const actions = Array.isArray(target)
    ? target
    : target instanceof THREE.AnimationAction
      ? [target]
      : Object.values(target);

  actions.forEach((action) => {
    action.loop = tipoDeLoop;
    action.clampWhenFinished = pausarAlFinalizar;
  });
}

//actions = [mixer.clipAction(clip),mixer.clipAction(clip),mixer.clipAction(clip)]
//action = mixer.clipAction(clip)

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

function fadeToAction(name, duration) {
  previousAction = activeAction;
  activeAction = actions[name];

  if (previousAction !== activeAction) {
    previousAction.fadeOut(duration);
  }

  activeAction
    .reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(duration)
    .play();
}

//----------------------------------------------------------------//
//              OBJETO UNIFICADOR DE ANIMACIONES
//----------------------------------------------------------------//
export const Anime = {
  loop: LOOP_TYPES,
  // Directo
  createMixer,
  createClock,

  groupActionsByName,
  configAnimations,
  // Minimalista
  Mixer: createMixer,
  Clock: createClock,
  groupAnimation: groupActionsByName,
};
