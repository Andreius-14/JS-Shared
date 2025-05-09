import * as THREE from "three";
//----------------------------------------------------------------//
//                       OBJETO GLOBAL
//----------------------------------------------------------------//
// Objeto contenedor (opcional)
// export const Luces = {
//   Direccional: crearLuzDireccional,
//   Puntual: crearLuzPuntual,
//   Focal: crearLuzFocal,
//
//   // Sombras
//   shadowDirecional: AddShadowtoDireccional,
//
//   // Aliases (opcionales)
//   Sol: crearLuzDireccional,
//   Bombilla: crearLuzPuntual,
//   Linterna: crearLuzFocal,
// };
//----------------------------------------------------------------//
//                       SOL
//----------------------------------------------------------------//

// SOL
// export function crearLuzDireccional(
//   escena,
//   posicion = [5, 5, 5],
//   {
//     color = 0xffffff,
//     intensidad = 3,
//     destino = [0, 0, 0],
//     ayuda = false,
//     generaSombra = false,
//   } = {},
// ) {
//   //variables
//   let luz, helper;
//
//   luz = new THREE.DirectionalLight(color, intensidad);
//   luz.position.set(...posicion);
//   luz.target.position.set(...destino);
//
//   escena?.add(luz, luz.target);
//
//   if (generaSombra) AddShadowtoDireccional(escena, luz);
//   if (ayuda) {
//     helper = new THREE.DirectionalLightHelper(luz);
//     escena?.add(helper);
//     return [luz, helper];
//   }
//
//   return luz;
// }
// export function AddShadowtoDireccional(
//   scene,
//   objetoLuz,
//   {
//     calidad = 512,
//     rangoShadowCamera = 2,
//     near = 0.5, // Nuevo: configurabilidad para near/far
//     far = 50,
//     ayuda = false,
//   } = {},
// ) {
//   objetoLuz.castShadow = true;
//   //Calidad del shadow map
//   objetoLuz.shadow.mapSize.set(calidad, calidad);
//   //Área de sombras (usando valores proporcionados o defaults)
//   objetoLuz.shadow.camera.top = rangoShadowCamera;
//   objetoLuz.shadow.camera.bottom = -rangoShadowCamera;
//   objetoLuz.shadow.camera.left = -rangoShadowCamera;
//   objetoLuz.shadow.camera.right = rangoShadowCamera;
//
//   // Distancia de sombras
//   objetoLuz.shadow.camera.near = near;
//   objetoLuz.shadow.camera.far = far;
//
//   // Corrección de artefactos (recomendado)
//   objetoLuz.shadow.bias = -0.001;
//
//   if (ayuda) scene.add(new THREE.CameraHelper(objetoLuz.shadow.camera));
// }
//----------------------------------------------------------------//
//                       BOMBILLA
//----------------------------------------------------------------//

// export function crearLuzPuntual(
//   escena,
//   posicion = [0, 5, 0], // Corregido: posición como parámetro
//   { color = 0xffffff, intensidad = 1, distancia = 10, ayuda = true } = {},
// ) {
//   const luz = new THREE.PointLight(color, intensidad, distancia);
//   luz.position.set(...posicion);
//   const helper = ayuda ? new THREE.PointLightHelper(luz) : null;
//
//   if (escena) {
//     escena.add(luz);
//     if (helper) escena.add(helper);
//   }
//
//   return { luz, helper };
// }

//----------------------------------------------------------------//
//                       LINTERNA
//----------------------------------------------------------------//

// export function crearLuzFocal(
//   escena,
//   posicion = [0, 5, 0],
//   objetivo = [0, 0, 0],
//   {
//     color = 0xffffff,
//     intensidad = 1,
//     distancia = 10,
//     anguloDeLuz = 45,
//     bordePenumbra_max1 = 0.1,
//     ayuda = true,
//   } = {},
// ) {
//   const anguloRad = (anguloDeLuz * THREE.MathUtils.DEG2RAD) / 2; // Conversión mejorada
//   //anguloDeLuz * (Math.PI / 360),
//   const luz = new THREE.SpotLight(
//     color,
//     intensidad,
//     distancia,
//     anguloRad,
//     bordePenumbra_max1,
//   );
//
//   luz.position.set(...posicion);
//   luz.target.position.set(...objetivo);
//   const helper = ayuda ? new THREE.SpotLightHelper(luz) : null;
//
//   if (escena) {
//     escena.add(luz, luz.target);
//     if (helper) escena.add(helper);
//   }
//
//   return { luz, helper };
// }
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
    {
      quality = 512,
      shadowCameraRange = 2,
      near = 0.5,
      far = 50,
      helper = false,
    } = {},
  ) {
    // Habilita
    light.castShadow = true;

    // Delimita
    light.shadow.mapSize.set(quality, quality);
    light.shadow.camera.top = shadowCameraRange;
    light.shadow.camera.bottom = -shadowCameraRange;
    light.shadow.camera.left = -shadowCameraRange;
    light.shadow.camera.right = shadowCameraRange;
    light.shadow.camera.near = near;
    light.shadow.camera.far = far;
    light.shadow.bias = -0.001;

    const shadowHelper = helper
      ? new THREE.CameraHelper(light.shadow.camera)
      : null;

    if (shadowHelper) this.scene?.add(shadowHelper);

    return shadowHelper;
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
    return this.createDirectional;
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
