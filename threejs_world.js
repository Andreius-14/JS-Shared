import * as THREE from "three";
import { scene } from "./threejs_Escena_I.js";
import { worldColor } from "./Shared-Const.js";

// Elementos A Insertar
export const worldAxis = (valor = 5) => {
  const worldAxis = new THREE.AxesHelper(valor);
  scene.add(worldAxis);
};
export const worldGrid = (valor = [50, 10]) => {
  const worldGrid = new THREE.GridHelper(...valor);
  scene.add(worldGrid);
};

// Elementos AutoInsertados (Funciones)
export const worldFloor = (colorPiso = worldColor.grey, tamaño = [20, 20]) => {
  let mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(...tamaño),
    new THREE.MeshPhongMaterial({ color: colorPiso, depthWrite: false }),
  );

  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);
};

export const worlNiebla = (color = worldColor.grey) => {
  scene.fog = new THREE.Fog(color, 20, 50);
};
