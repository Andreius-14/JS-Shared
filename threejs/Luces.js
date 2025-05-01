import * as THREE from "three";
//----------------------------------------------------------------//
//                       OBJETO GLOBAL
//----------------------------------------------------------------//
// Objeto contenedor (opcional)
export const Luces = {
  Direccional: crearLuzDireccional,
  Puntual: crearLuzPuntual,
  Focal: crearLuzFocal,

  // Aliases (opcionales)
  Sol: crearLuzDireccional,
  Bombilla: crearLuzPuntual,
  Linterna: crearLuzFocal,
};
//----------------------------------------------------------------//
//                       FUNCTION
//----------------------------------------------------------------//

// SOL
export function crearLuzDireccional(
  escena,
  posicion = [5, 5, 5],
  { color = 0xffffff, intensidad = 3, destino = [0, 0, 0], ayuda = true } = {},
) {
  const luz = new THREE.DirectionalLight(color, intensidad);
  luz.position.set(...posicion);
  luz.target.position.set(...destino);
  const helper = ayuda ? new THREE.DirectionalLightHelper(luz) : null;

  if (escena) {
    escena.add(luz, luz.target);
    if (helper) escena.add(helper);
  }

  return { luz, helper };
}

//Bombilla
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
// Linterna
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
