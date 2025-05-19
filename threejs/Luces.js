import * as THREE from "three";

//╔═══════════════════╦══════════════════════════╦══════════════════════════╦══════════════════════════╗
//║                   ║  DirectionalLight (Sol)  ║    SpotLight (Linterna)  ║  PointLight (Bombilla)   ║
//╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
//║     Dirección     ║     Paralela (→)         ║       Cono (↘)           ║   Omnidireccional (☇)    ║
//╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
//║      Target       ║       Opcional           ║      Obligatorio         ║       No aplica          ║
//╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
//║    Atenuación     ║          No              ║          Sí              ║   Sí (configurable)      ║
//╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
//║     Sombras       ║       Paralelas          ║       En cono            ║       Esféricas          ║
//╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
//║    Rendimiento    ║   ⚡️ Más eficiente       ║      ⚠️ Moderado          ║      💣 Costoso          ║
//╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
//║    Uso típico     ║     Luz diurna           ║   Focos/reflectores      ║ Lámparas/fuentes puntual.║
//╚═══════════════════╩══════════════════════════╩══════════════════════════╩══════════════════════════╝

//----------------------------------------------------------------//
//                        Clase LightBuilder
//----------------------------------------------------------------//
export class LightBuilder {
  constructor(scene) {
    this.scene = scene;
  }

  //----------------------------------------------------------------//
  //                       MÉTODOS PRINCIPALES
  //----------------------------------------------------------------//

  createDirectional({
    position = [5, 5, 5],
    color = 0xffffff,
    intensity = 3,
    objetivo = [0, 0, 0],
    ayuda = false,
    generaSombra = false,
  } = {}) {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...position);
    light.target.position.set(...objetivo);

    this.scene?.add(light, light.target);

    const lightHelper = ayuda ? new THREE.DirectionalLightHelper(light) : null;

    if (generaSombra) this.addShadowToDirectional(light);
    if (ayuda) {
      this.scene?.add(lightHelper);
      return [light, lightHelper];
    }

    return light;
  }

  addShadowToDirectional(
    light,
    { quality = 512, range = 2, near = 0.5, far = 30, helper = false } = {},
  ) {
    // Habilita
    light.castShadow = true;
    light.shadow.mapSize.width = quality;
    light.shadow.mapSize.height = quality;

    light.shadow.camera.top = range;
    light.shadow.camera.bottom = -range;
    light.shadow.camera.left = -range;
    light.shadow.camera.right = range;

    light.shadow.camera.near = near;
    light.shadow.camera.far = far;
    light.shadow.bias = -0.001;

    const help = helper ? new THREE.CameraHelper(light.shadow.camera) : null;

    if (help) this.scene?.add(help);

    return help;
  }

  createPoint({
    position = [0, 5, 0],
    color = 0xffffff,
    intensity = 1,
    distance = 10,
    helper = false,
  } = {}) {
    const light = new THREE.PointLight(color, intensity, distance);
    light.position.set(...position);

    const lightHelper = helper ? new THREE.PointLightHelper(light) : null;

    this.scene?.add(light);

    if (lightHelper) {
      this.scene?.add(lightHelper);
      return [light, lightHelper];
    }

    return light;
  }

  createSpot({
    position = [0, 5, 0],
    objetivo = [0, 0, 0],
    color = 0xffffff,
    intensity = 1,
    distance = 10,
    angleGrados = 45,
    angleRadian = null,
    penumbraBorde = 0.1,
    ayuda = false,
    shadow = false,
  } = {}) {
    const anguloConvertido = (angleGrados * THREE.MathUtils.DEG2RAD) / 2;
    const angulo = angleRadian || anguloConvertido;

    const light = new THREE.SpotLight(color, intensity);

    light.distance = distance;
    light.angle = angulo;
    light.penumbra = penumbraBorde;
    light.castShadow = shadow;
    light.position.set(...position);
    light.target.position.set(...objetivo);

    const lightHelper = ayuda ? new THREE.SpotLightHelper(light) : null;

    this.scene?.add(light, light.target);

    if (lightHelper) {
      this.scene.add(lightHelper);
      return [light, lightHelper];
    }

    return light;
  }

  //----------------------------------------------------------------//
  //                       ALIASES
  //----------------------------------------------------------------//

  get Direccional() {
    return this.createDirectional;
  }
  get Point() {
    return this.createPoint;
  }
  get Spot() {
    return this.createSpot;
  }

  //ES
  get Sol() {
    return ({
      position = [0, 20, 10], // Valores por defecto desestructurados
      color = 0xffffff,
      intensity = 3,
      objetivo = [0, 0, 0],
      ayuda = false,
      generaSombra = false,
    } = {}) => {
      // <- `= {}` evita errores si no se pasa nada
      return this.createDirectional({
        position,
        color,
        ayuda,
        intensity,
        objetivo,
        generaSombra,
      });
    };
  }
  get Bombilla() {
    return this.createPoint;
  }
  get Linterna() {
    return this.createSpot;
  }

  // Sombras
  get shadowDirecional() {
    return this.addShadowToDirectional;
  }
}
