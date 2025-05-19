//----------------------------------------------------------------//
//                           AYUDA
//----------------------------------------------------------------//

export const debounce = (fn, delay = 100) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

//----------------------------------------------------------------//
//                         EVENTOS
//----------------------------------------------------------------//

export const EventoResize = (camara, renderer) => {
  const actualizar = () => {
    //variables
    const [w, h] = [globalThis.innerWidth, globalThis.innerHeight];
    //configuracion
    camara.aspect = w / h;
    camara.updateProjectionMatrix();
    //Final
    renderer.setSize(w, h);
  };

  globalThis.addEventListener("resize", debounce(actualizar));
  actualizar();
};

export const EventoFullScreen = (renderer) => {
  const alternar = () => {
    if (!document.fullscreenElement) {
      renderer.domElement
        .requestFullscreen()
        .catch((e) => console.warn("Error en pantalla completa:", e));
    } else {
      document.exitFullscreen();
    }
  };
  renderer.domElement.addEventListener("dblclick", alternar);
};

export const evento = {
  //NameOriginal
  // MultiResizes,

  //Alias
  Resize: EventoResize,
  FullScreen: EventoFullScreen,
};

//Bloquea el Mouse dentro del Cambas
//Mueve la Camara

//export const EventoPointerLock = (renderer, camara, sensibilidad = 0.002) => {
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
//};

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
