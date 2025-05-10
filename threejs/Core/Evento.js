export const EventoResize = (camara, renderer) => {
  const actualizar = () => {
    camara.aspect = globalThis.innerWidth / globalThis.innerHeight;
    camara.updateProjectionMatrix();
    renderer.setSize(globalThis.innerWidth, globalThis.innerHeight);
  };

  // Debounce para mejorar rendimiento
  let debounce;
  globalThis.addEventListener("resize", () => {
    clearTimeout(debounce);
    debounce = setTimeout(actualizar, 100);
  });

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
