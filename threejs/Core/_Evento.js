/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */
import * as THREE from 'three'
// ----------------------------------------------------------------//
//                           AYUDA
// ----------------------------------------------------------------//

export const debounce = (fn, delay = 100) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
    }
}

// ----------------------------------------------------------------//
//                         EVENTOS
// ----------------------------------------------------------------//

export const EventoResize = (camara, renderer) => {
    const actualizar = () => {
        const [w, h] = [globalThis.innerWidth, globalThis.innerHeight]
        camara.aspect = w / h
        camara.updateProjectionMatrix()
        renderer.setSize(w, h)
    }

    const handler = debounce(actualizar)
    globalThis.addEventListener('resize', handler)
    actualizar()

    return () => {
        globalThis.removeEventListener('resize', handler)
    }
}

export const EventoFullScreen = (renderer) => {
    const alternar = () => {
        if (!document.fullscreenElement) {
            renderer.domElement
                .requestFullscreen()
                .catch((e) => console.warn('Error en pantalla completa:', e))
        } else {
            document.exitFullscreen()
        }
    }
    renderer.domElement.addEventListener('dblclick', alternar)

    return () => {
        renderer.domElement.removeEventListener('dblclick', alternar)
    }
}


export const EventoVisibilityStopAnimate = (renderer, funcionAnimateName) => {
    // Funcion Evento - Detinen el Loop Animate. 
    // Deteniendo Fisicas y renderer
    const onChange = () => {
        if (!renderer) return
        renderer.setAnimationLoop(document.hidden ? null : funcionAnimateName)
    }

    document.addEventListener('visibilitychange', onChange)

    return () => {
        document.removeEventListener('visibilitychange', onChange)
    }
}


// export const EventoCleanScene = (renderer, scene) => {
//     // Eliminar listener previo (si existe)
//     // globalThis.removeEventListener("beforeunload", clean);
//     globalThis.addEventListener('beforeunload', cleanOld(scene, renderer))
//
//     // 5. Devolver función para limpieza manual + desregistro
//     return () => {
//         cleanOld() // Ejecuta la limpieza
//         globalThis.removeEventListener('beforeunload', cleanOld) // Elimina el listener
//     }
// }

// export const EventoCleanAll = (scene, render, stats, controls) => {
//
//     const cleanUp = () => {
//         clean.scene(scene)
//         clean.render(render)
//         clean.addon(stats, controls)
//     }
//     globalThis.addEventListener('beforeunload', cleanUp)
//
//     return () => {
//         globalThis.removeEventListener('beforeunload', cleanUp) // Elimina el listener
//     }
//
// }
export const evento = {
    // NameOriginal
    // MultiResizes,

    // Alias
    Resize: EventoResize,
    FullScreen: EventoFullScreen,
    Visibility: EventoVisibilityStopAnimate

    // Clean: EventoCleanAll

}

// Bloquea el Mouse dentro del Cambas
// Mueve la Camara

// export const EventoPointerLock = (renderer, camara, sensibilidad = 0.002) => {
//  const moverCamara = (e) => {
//    if (document.pointerLockElement === renderer.domElement) {
//      camara.rotation.y -= e.movementX * sensibilidad;
//      camara.rotation.x = Math.max(
//        -Math.PI / 2,
//        Math.min(Math.PI / 2, camara.rotation.x - e.movementY * sensibilidad),
//      );
//    }
//  };
//
//  renderer.domElement.addEventListener("click", () => {
//    renderer.domElement.requestPointerLock();
//  });
//
//  document.addEventListener("mousemove", moverCamara);
//
//  return () => {
//    document.removeEventListener("mousemove", moverCamara);
//  };
// };

// export const MultiResizes = (
//   renderer,
//   camaras = [{ cam: null, scale: null }],
// ) => {
//   const actualizar = () => {
//     // variables
//     const [w, h] = [globalThis.innerWidth, globalThis.innerHeight];
//
//     camaras.forEach(({ cam, scale }) => {
//       if (!cam) return;
//       // console.log(cam);
//       // console.log(scale);
//       if (scale) {
//         const insetw = h / scale;
//         const inseth = h / scale;
//         cam.aspect = insetw / inseth; // cuadrado
//       } else {
//         cam.aspect = w / h;
//       }
//       console.log(cam.aspect);
//
//       cam.updateProjectionMatrix();
//     });
//
//     renderer.setSize(w, h);
//   };
//
//   globalThis.addEventListener("resize", debounce(actualizar));
//   actualizar();
// };
