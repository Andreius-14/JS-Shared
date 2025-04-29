import * as THREE from "three";
import { worldColor } from "../Shared-Const.js";

export const World = {
  // Helpers visuales
  Axis: (scene, size = 10) => {
    const helper = new THREE.AxesHelper(size);
    scene.add(helper);
    return helper;
  },

  Grid: (scene, size = 50, divisions = 10) => {
    const helper = new THREE.GridHelper(size, divisions);
    scene.add(helper);
    return helper;
  },

  // Elementos del entorno
  Floor: (scene, color = worldColor.grey, size = 20) => {
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

  Niebla: (scene, color = worldColor.grey, near = 20, far = 50) => {
    scene.fog = new THREE.Fog(color, near, far);
  },

  Light: (scene, color = worldColor.dark_gray, intensity = 1) => {
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
    return light;
  },
  Background: (scene, color = worldColor.grey) => {
    scene.background = new THREE.Color(color);
  },
};
