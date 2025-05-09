import * as THREE from "three";
import { worldColor } from "../../Shared-Const.js";
//----------------------------------------------------------------//
//                        Objeto
//----------------------------------------------------------------//

// export const World = {
//   // Helpers visuales
//   Axis: crearEje,
//   Grid: crearGrid,
//
//   // Elementos del entorno
//   Floor: crearSuelo,
//   Niebla: crearNiebla,
//
//   // Elementos Iluminacion
//   Light: crearLuzAmbiental,
//   Background: crearFondo,
//
//   // Aliases (opcionales)
//   AxesHelper: crearEje,
//   GridHelper: crearGrid,
//   AmbientLight: crearLuzAmbiental,
//   HemisphereLight: creaLuzCieloTierra,
//   Fog: crearNiebla,
//   Suelo: crearSuelo,
//   Fondo: crearFondo,
// };
//
//----------------------------------------------------------------//
//                        Functions
//----------------------------------------------------------------//

// Funciones individuales (exportaciones nombradas)
// function crearEje(scene, size = 10) {
//   const helper = new THREE.AxesHelper(size);
//   scene.add(helper);
//   return helper;
// }
//
// function crearGrid(scene, size = 50, divisions = 10, opacidad = 0.2) {
//   const helper = new THREE.GridHelper(size, divisions);
//   helper.material.opacity = opacidad;
//   helper.material.transparent = true;
//   scene.add(helper);
//   return helper;
// }
//
// function crearSuelo(
//   scene,
//   color = worldColor.grey,
//   size = 20,
//   { recibeSombra = false } = {},
// ) {
//   const mesh = new THREE.Mesh(
//     new THREE.PlaneGeometry(size, size),
//     new THREE.MeshPhongMaterial({
//       color,
//       depthWrite: false,
//     }),
//   );
//   mesh.rotation.x = -Math.PI / 2;
//   mesh.receiveShadow = recibeSombra;
//
//   if (scene) scene.add(mesh);
//
//   return mesh;
// }
//
// function crearNiebla(scene, color = worldColor.grey, near = 20, far = 50) {
//   scene.fog = new THREE.Fog(color, near, far);
// }
//
// function crearFondo(scene, color = worldColor.grey) {
//   scene.background = new THREE.Color(color);
// }

//----------------------------------------------------------------//
//                        ILUMINACION
//----------------------------------------------------------------//
// function crearLuzAmbiental(scene, color = worldColor.dark_gray, intensity = 1) {
//   const light = new THREE.AmbientLight(color, intensity);
//   scene.add(light);
//   return light;
// }
// //efecto natural (ej: un paisaje con cielo y suelo diferenciados).
// function creaLuzCieloTierra(
//   scena,
//   posicion = [0, 20, 0],
//   skyColor = 0xffffff,
//   groundColor = 0x8d8d8d,
//   intensidad = 3,
// ) {
//   const luz = new THREE.HemisphereLight(skyColor, groundColor, intensidad);
//   luz.position.set(...posicion);
//   if (scena) scena.add(luz);
//   return luz;
// }
//+------------------+----------------------------+------------------------------+
//|   Característica | AmbientLight               | HemisphereLight              |
//+------------------+----------------------------+------------------------------+
//| Iluminación      | Uniforme                   | Cielo/suelo (2 colores)      |
//| Sombras          | ❌ No                      | ❌ No                        |
//| Realismo         | Bajo                       | Alto                         |
//| Uso              | Interiores                 | Exteriores                   |
//| Rendimiento      | Óptimo                     | Bueno                        |
//+------------------+----------------------------+------------------------------+

export class WorldBuilder {
  constructor(scene) {
    this.scene = scene;
  }
  // Helpers visuales
  createAxis(size = 10) {
    const helper = new THREE.AxesHelper(size);
    this.scene.add(helper);
    return helper;
  }
  createGrid(size = 50, divisions = 10, opacity = 0.2) {
    const helper = new THREE.GridHelper(size, divisions);
    helper.material.opacity = opacity;
    helper.material.transparent = true;
    this.scene.add(helper);
    return helper;
  }

  // Elementos del entorno
  createFloor(
    color = worldColor.grey,
    size = 20,
    { receivesShadow = false } = {},
  ) {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshPhongMaterial({
        color,
        depthWrite: false,
      }),
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = receivesShadow;
    this.scene.add(mesh);
    return mesh;
  }

  createFog(color = worldColor.grey, near = 20, far = 50) {
    this.scene.fog = new THREE.Fog(color, near, far);
    return this.scene.fog;
  }

  setBackground(color = worldColor.grey) {
    this.scene.background = new THREE.Color(color);
    return this.scene.background;
  }

  // Elementos Iluminación
  createAmbientLight(color = worldColor.dark_gray, intensity = 1) {
    const light = new THREE.AmbientLight(color, intensity);
    this.scene.add(light);
    return light;
  }

  createHemisphereLight(
    position = [0, 20, 0],
    skyColor = 0xffffff,
    groundColor = 0x8d8d8d,
    intensity = 3,
  ) {
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    light.position.set(...position);
    this.scene.add(light);
    return light;
  }

  // Aliases
  get Axis() {
    return this.createAxis;
  }
  get Grid() {
    return this.createGrid;
  }
  get Floor() {
    return this.createFloor;
  }
  get Fog() {
    return this.createFog;
  }
  get Light() {
    return this.createAmbientLight;
  }
  get Background() {
    return this.setBackground;
  }
  get AxesHelper() {
    return this.createAxis;
  }
  get GridHelper() {
    return this.createGrid;
  }
  get AmbientLight() {
    return this.createAmbientLight;
  }
  get HemisphereLight() {
    return this.createHemisphereLight;
  }

  // ES
  get Suelo() {
    return this.createFloor;
  }
  get Fondo() {
    return this.setBackground;
  }
  get Niebla() {
    return this.createFog;
  }
}
