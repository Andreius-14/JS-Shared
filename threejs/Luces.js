import * as THREE from "three";
//----------------------------------------------------------------//
//                       OBJETO GLOBAL
//----------------------------------------------------------------//
// Objeto contenedor (opcional)
export const Luces = {
  Direccional: crearLuzDireccional,
  Puntual: crearLuzPuntual,
  Focal: crearLuzFocal,

  // Sombras
  shadowDirecional: AddShadowtoDireccional,

  // Aliases (opcionales)
  Sol: crearLuzDireccional,
  Bombilla: crearLuzPuntual,
  Linterna: crearLuzFocal,
};
//----------------------------------------------------------------//
//                       SOL
//----------------------------------------------------------------//

// SOL
export function crearLuzDireccional(
  escena,
  posicion = [5, 5, 5],
  {
    color = 0xffffff,
    intensidad = 3,
    destino = [0, 0, 0],
    ayuda = false,
    generaSombra = false,
  } = {},
) {
  //variables
  let luz, helper;

  luz = new THREE.DirectionalLight(color, intensidad);
  luz.position.set(...posicion);
  luz.target.position.set(...destino);

  escena?.add(luz, luz.target);

  if (generaSombra) AddShadowtoDireccional(escena, luz);
  if (ayuda) {
    helper = new THREE.DirectionalLightHelper(luz);
    escena?.add(helper);
    return [luz, helper];
  }

  return luz;
}
export function AddShadowtoDireccional(
  scene,
  objetoLuz,
  {
    calidad = 512,
    rangoShadowCamera = 2,
    near = 0.5, // Nuevo: configurabilidad para near/far
    far = 50,
    ayuda = false,
  } = {},
) {
  objetoLuz.castShadow = true;
  //Calidad del shadow map
  objetoLuz.shadow.mapSize.set(calidad, calidad);
  //Área de sombras (usando valores proporcionados o defaults)
  objetoLuz.shadow.camera.top = rangoShadowCamera;
  objetoLuz.shadow.camera.bottom = -rangoShadowCamera;
  objetoLuz.shadow.camera.left = -rangoShadowCamera;
  objetoLuz.shadow.camera.right = rangoShadowCamera;

  // Distancia de sombras
  objetoLuz.shadow.camera.near = near;
  objetoLuz.shadow.camera.far = far;

  // Corrección de artefactos (recomendado)
  objetoLuz.shadow.bias = -0.001;

  if (ayuda) scene.add(new THREE.CameraHelper(objetoLuz.shadow.camera));
}
//----------------------------------------------------------------//
//                       BOMBILLA
//----------------------------------------------------------------//

export function crearLuzPuntual(
  escena,
  posicion = [0, 5, 0], // Corregido: posición como parámetro
  { color = 0xffffff, intensidad = 1, distancia = 10, ayuda = true } = {},
) {
  const luz = new THREE.PointLight(color, intensidad, distancia);
  luz.position.set(...posicion);
  const helper = ayuda ? new THREE.PointLightHelper(luz) : null;

  if (escena) {
    escena.add(luz);
    if (helper) escena.add(helper);
  }

  return { luz, helper };
}

//----------------------------------------------------------------//
//                       BOMBILLA
//----------------------------------------------------------------//

export function crearLuzFocal(
  escena,
  posicion = [0, 5, 0],
  objetivo = [0, 0, 0],
  {
    color = 0xffffff,
    intensidad = 1,
    distancia = 10,
    anguloDeLuz = 45,
    bordePenumbra_max1 = 0.1,
    ayuda = true,
  } = {},
) {
  const anguloRad = (anguloDeLuz * THREE.MathUtils.DEG2RAD) / 2; // Conversión mejorada
  //anguloDeLuz * (Math.PI / 360),
  const luz = new THREE.SpotLight(
    color,
    intensidad,
    distancia,
    anguloRad,
    bordePenumbra_max1,
  );

  luz.position.set(...posicion);
  luz.target.position.set(...objetivo);
  const helper = ayuda ? new THREE.SpotLightHelper(luz) : null;

  if (escena) {
    escena.add(luz, luz.target);
    if (helper) escena.add(helper);
  }

  return { luz, helper };
}
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

// Esta bien si quieres simplificarlos mas es tu problema
