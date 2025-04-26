import * as THREE from "three";
import { scene } from "./threejs_Escena_I.js";
import { worldColor } from "./Shared-Const.js";

export const World = {
  // Helpers visuales
  Axis: (size = 10) => {
    const helper = new THREE.AxesHelper(size);
    scene.add(helper);
    return helper;
  },

  Grid: (size = 50, divisions = 10) => {
    const helper = new THREE.GridHelper(size, divisions);
    scene.add(helper);
    return helper;
  },

  // Elementos del entorno
  Floor: (color = worldColor.grey, size = 20) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshPhongMaterial({
        color,
        depthWrite: false,
      }),
    );
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);
    return mesh;
  },

  Niebla: (color = worldColor.grey, near = 20, far = 50) => {
    scene.fog = new THREE.Fog(color, near, far);
  },

  Light: (color = worldColor.white, intensity = 0.5) => {
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
    return light;
  },
  Background: (color = worldColor.grey) => {
    scene.background = new THREE.Color(color);
  },
};

// Elementos A Insertar
//export const worldAxis = (valor = 5) => {
//  const worldAxis = new THREE.AxesHelper(valor);
//  scene.add(worldAxis);
//};
//export const worldGrid = (valor = [50, 10]) => {
//  const worldGrid = new THREE.GridHelper(...valor);
//  scene.add(worldGrid);
//};

// Elementos AutoInsertados (Funciones)
//export const worldFloor = (colorPiso = worldColor.grey, tamaño = [20, 20]) => {
//  let mesh = new THREE.Mesh(
//    new THREE.PlaneGeometry(...tamaño),
//    new THREE.MeshPhongMaterial({ color: colorPiso, depthWrite: false }),
//  );
//
//  mesh.rotation.x = -Math.PI / 2;
//  scene.add(mesh);
//};

//export const worlNiebla = (color = worldColor.grey) => {
//  scene.fog = new THREE.Fog(color, 20, 50);
//};
//
//export const worldLight = (color = 0x404040, intencidad = 0.5) => {
//  const mundo = new THREE.AmbientLight(color, intencidad);
//  scene.add(mundo);
//  return mundo;
//};
