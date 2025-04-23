import * as THREE from "three";
import { scene } from "./threejs_Escena_I.js";

//export const light = new THREE.DirectionalLight(0xffffff, 1);
//light.position.set(2, 2, 1);
//light.target.position.set(0, 0, 0);
//
//export const helper = new THREE.DirectionalLightHelper(light); // GUI Vizualiza la Luz

export const worldLight = (color = 0x404040, intencidad = 0.5) => {
  const mundo = new THREE.AmbientLight(color, intencidad);
  scene.add(mundo);
  return mundo;
};

export const Luz = (
  color = 0xffffff,
  intencidad = 0.5,
  origen = [2, 2, 1],
  destino = [0, 0, 0],
  ayudaVisual = true,
) => {
  const luz = new THREE.DirectionalLight(color, intencidad);
  luz.position.set(...origen);
  luz.target.position.set(...destino);

  const luzAyuda = new THREE.DirectionalLightHelper(luz);

  scene.add(luz);
  if (ayudaVisual) {
    scene.add(luzAyuda);
  }
};
