import * as THREE from "three";

export function newCamara() {
  const camara = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500,);
  return camara;
}

// Producto individual no necesita de un Tercero