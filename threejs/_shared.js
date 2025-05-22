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

//--------------------------------------
// INDEPENDIENTES
//--------------------------------------
export function toArray(variable) {
  return Array.isArray(variable) ? variable : variable ? [variable] : [];
}

export function esString(valor) {
  return typeof valor === "string" || valor instanceof String;
}

export function toRadians(value) {
  return Array.isArray(value)
    ? value.map((v) => v * (Math.PI / 180))
    : value * (Math.PI / 180);
}
//--------------------------------------
// DEPENDIENTES
//--------------------------------------
