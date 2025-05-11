import * as THREE from "three";
import { colorCss, colorHex } from "../../Shared-Const.js";
import { Mesh, geo, mat } from "../Mesh.js";

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
  constructor(scene, color = colorCss.lightGrey) {
    this.scene = scene;
    this.color = color;
    this.ambientLight = null;
    this.hemiLight = null;
  }

  //------------------
  //   HELPERS
  //------------------
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

  //------------------
  //   ELEMENTOS
  //------------------

  createFloor(color = this.color, size = 20, shadow = false) {
    const g = geo.Plano(size, size);
    const m = mat.Reflectante();
    const mesh = Mesh.simple(g, m, color);

    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = shadow;
    this.scene.add(mesh);
    return mesh;
  }

  createFog(near = 20, far = 50, color = this.color) {
    this.scene.fog = new THREE.Fog(color, near, far);
    return this.scene.fog;
  }

  setBackground(color = this.color) {
    this.scene.background = new THREE.Color(color);
    return this.scene.background;
  }
  //------------------
  //   ILUMINACION
  //------------------

  createAmbientLight(color = this.color, intensity = 1) {
    this.ambientLight = new THREE.AmbientLight(color, intensity);
    this.scene.add(this.ambientLight);
    return this.ambientLight;
  }

  createHemisphereLight(
    position = [0, 20, 0],
    sky = 0xffffff,
    floor = 0x8d8d8d,
    intensity = 3,
  ) {
    this.hemiLight = new THREE.HemisphereLight(sky, floor, intensity);
    light.position.set(...position);
    this.scene.add(this.hemiLight);
    return this.hemiLight;
  }
  createLightRealista(
    renderer,
    { intensity = 0.04, resolucion = 256, disableBasicLights = true } = {},
  ) {
    const pmremGenerator = new THREE.PMREMGenerator(renderer); // Cuarto - Efecto de Luz
    pmremGenerator.setResolution(resolucion);

    // Generar mapa de entorno realista
    const envMap = pmremGenerator.fromScene(new RoomEnvironment(), intensity);
    envMap.texture.encoding = THREE.sRGBEncoding;
    this.scene.environment = envMap.texture;

    pmremGenerator.dispose(); // liberar recursos

    // 3. Desactivar luces básicas si existen
    if (disableBasicLights) {
      if (this.ambientLight) this.scene.remove(this.ambientLight);
      if (this.hemiLight) this.scene.remove(this.hemiLight);
    }
  }
  //------------------
  //   ALIAS
  //------------------

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
  get Background() {
    return this.setBackground;
  }

  // Minimalista
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
  get SkyPiso() {
    return this.createHemisphereLight;
  }
  get Bg() {
    return this.Background;
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
