import * as THREE from "three";
import { worldColor } from "../Shared-Const.js";

//----------------------------------------------------------------//
//                        Objeto
//----------------------------------------------------------------//

export const World = {
  // Helpers visuales
  Axis: crearEje,
  Grid: crearGrid,

  // Elementos del entorno
  Floor: crearSuelo,
  Niebla: crearNiebla,
  Light: crearLuzAmbiental,
  Background: crearFondo,

  // Aliases adicionales (opcionales)
  Eje: crearEje,
  Cuadricula: crearGrid,
  Suelo: crearSuelo,
  Fog: crearNiebla,
  AmbientLight: crearLuzAmbiental,
  Fondo: crearFondo,
};

//----------------------------------------------------------------//
//                        Functions
//----------------------------------------------------------------//

// Funciones individuales (exportaciones nombradas)
function crearEje(scene, size = 10) {
  const helper = new THREE.AxesHelper(size);
  scene.add(helper);
  return helper;
}

function crearGrid(scene, size = 50, divisions = 10) {
  const helper = new THREE.GridHelper(size, divisions);
  //helper.material.opacity = 0.2;
  //helper.material.transparent = true;
  scene.add(helper);
  return helper;
}

function crearSuelo(scene, color = worldColor.grey, size = 20) {
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
}

function crearNiebla(scene, color = worldColor.grey, near = 20, far = 50) {
  scene.fog = new THREE.Fog(color, near, far);
}

function crearLuzAmbiental(scene, color = worldColor.dark_gray, intensity = 1) {
  const light = new THREE.AmbientLight(color, intensity);
  scene.add(light);
  return light;
}

function crearFondo(scene, color = worldColor.grey) {
  scene.background = new THREE.Color(color);
}

// Objeto contenedor (opcional)
