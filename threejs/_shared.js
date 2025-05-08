import * as THREE from "three";

// shared.js
export function enableShadows(model, { proyecta = true, recibe = false } = {}) {
  if (model.traverse) {
    model.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = proyecta;
        obj.receiveShadow = recibe;
      }
    });
  }

  if (model.isMesh) {
    model.castShadow = proyecta;
    model.receiveShadow = recibe;
  }
}
