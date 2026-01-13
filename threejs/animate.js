/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */
import * as THREE from "three";
import { toArray } from "./_shared.js";

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
    let name;

    for (const clip of animations) {
        if (clip.name) {
            //Normalizar
            name = clip.name.trim(); //Opcional .toLowerCase()
            //Asignar
            actions[name] = mixer.clipAction(clip);
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

//----------------------------------------------------------------//
//                          CONFIGURACION
//----------------------------------------------------------------//

// 🕹️ Configura las animaciones disponibles a partir de los clips

//actions = [mixer.clipAction(clip),mixer.clipAction(clip),mixer.clipAction(clip)]
//action = mixer.clipAction(clip)
//

//Predeterminadas
// action.enabled = true;
// action.setEffectiveTimeScale(1)
// action.setEffectiveWeight(0)
// action.clampWhenFinished = false

// action.setEffectiveTimeScale(timeScale);
// action.setEffectiveWeight(weight);

// => Suave al iniciar el salto
// action.zeroSlopeAtStart = true;

// => Suave al caer
// action.zeroSlopeAtEnd = true;

//----------------------
// Configuracion Basica
// ---------------------
// { => new
//   action.enabled = true
//   action.setEffectiveTimeScale(timeScale);
//   action.setEffectiveWeight(weight);
// }
// { => old
//   old.fadeOut(0.5)
// }
// { =>new
//   action.reset()
//   action.fadeOut(0.5)
//
//   action.play()
// }
//
//  if (mixer) mixer.update(delta);
// ----------------------
// Configuracion Fluida
// ----------------------
// { ==> new
//  action.reset();
//  action.weight = 1.0;
//  action.stopFading();
// }
// { ==> old
//   old.stopFading();
// }
// { ==> new - old
//  if (play !== "Idle")
//     action.time = old.time * (current.getClip().duration / old.getClip().duration);
// }

// { ==> new - old
//      old._scheduleFading(fade, old.getEffectiveWeight(), 0);
//      current._scheduleFading(fade, current.getEffectiveWeight(), 1);
// }

//{ ==> new
//      action.play
//}

// if (mixer) mixer.update(delta);

function configAnimations(
    target,
    loop = LOOP_TYPES.bucle,
    pausarAlFinalizar = false,
) {
    toArray(target).forEach((action) => {
        action.loop = loop;
        action.clampWhenFinished = pausarAlFinalizar;
    });
}

function pauseAll(actions) {
    toArray(actions).forEach((action) => (action.paused = true));
}

function unPauseAll(actions) {
    toArray(actions).forEach((action) => (action.paused = false));
}

function playAll(actions) {
    toArray(actions).forEach((action) => action.play());
}

function stopAll(actions) {
    toArray(actions).forEach((action) => action.stop());
}

const Config = {
    configAnimations,
    //
    stopAll,
    playAll,
    //
    pauseAll,
    unPauseAll,
    //
    basico: configAnimations,
};

//Suavisado entre Animaciones
// function fadeToAction(name, duration) {
//   previousAction = activeAction;
//   activeAction = actions[name];
//
//   if (previousAction !== activeAction) {
//     previousAction.fadeOut(duration);
//   }
//
//   activeAction
//     .reset()
//     .setEffectiveTimeScale(1)
//     .setEffectiveWeight(1)
//     .fadeIn(duration)
//     .play();
// }

function SoftChange(actions = {}, nameNew, objCurrent = {}, fade = 0.5) {
    if (objCurrent.current === nameNew) return false;

    // console.log(objCurrent.current, " ===> ", nameNew);

    const current = actions[nameNew];
    const old = actions[objCurrent.current];
    // Actualizar estado
    objCurrent.current = nameNew;

    //New
    current.reset();
    current.weight = 1.0;
    current.stopFading();

    //Old
    old.stopFading();

    if (nameNew !== "Idle")
        current.time =
            old.time * (current.getClip().duration / old.getClip().duration);
    //
    old._scheduleFading(fade, old.getEffectiveWeight(), 0);
    current._scheduleFading(fade, current.getEffectiveWeight(), 1);

    //Ejecutando Animacion
    current.play();
}

function SoftDura(actions = {}, nameNew, objCurrent = {}, fade = 0.5) {
    if (objCurrent.current === nameNew) return false;

    // console.log(objCurrent.current, " ===> ", nameNew);

    const current = actions[nameNew];
    const old = actions[objCurrent.current];
    objCurrent.current = nameNew;

    setWeight(current, 1.0);
    old.fadeOut(fade);
    current.reset().fadeIn(fade).play();
}
function setWeight(action, weight) {
    action.enabled = true;
    action.setEffectiveTimeScale(1);
    action.setEffectiveWeight(weight);
}
//----------------------------------------------------------------//
//              OBJETO UNIFICADOR DE ANIMACIONES
//----------------------------------------------------------------//
export const Anime = {
    // Objetos
    loop: LOOP_TYPES,
    config: Config,

    // Directo
    createMixer,
    createClock,
    SoftChange,
    SoftDura,

    groupActionsByName,
    configAnimations,
    // Minimalista
    Mixer: createMixer,
    Clock: createClock,
    groupAnimation: groupActionsByName,
};
