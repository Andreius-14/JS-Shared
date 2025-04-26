import * as THREE from "three";
import { scene } from "./threejs_Escena_I.js";

export const Luces = {
  //----------------------------------------------------------------//
  //                           SOL
  //----------------------------------------------------------------//
  Direccional: (
    color = 0xffffff,
    intensidad = 1,
    posicion = [5, 5, 5],
    destino = [0, 0, 0],
    ayuda = true,
  ) => {
    // Variables (LUZ)
    const luz = new THREE.DirectionalLight(color, intensidad);

    // Propiedades (LUZ)
    luz.position.set(...posicion);
    luz.target.position.set(...destino);
    scene.add(luz);
    scene.add(luz.target);

    // Variable (Helper)
    const helper = ayuda ? new THREE.DirectionalLightHelper(luz) : null;
    if (helper) scene.add(helper);

    return { luz, helper };
  },
  //----------------------------------------------------------------//
  //                      BOMBILLA - VELA
  //----------------------------------------------------------------//
  Puntual: (
    color = 0xffffff,
    intensidad = 1,
    distancia = 10,
    posicion = [0, 0, 0],
    ayuda = true,
  ) => {
    // Variables - Luz
    const luz = new THREE.PointLight(color, intensidad, distancia);
    // Propiedades
    luz.position.set(...posicion);
    scene.add(luz);

    // Variables - Helper
    const helper = ayuda ? new THREE.PointLightHelper(luz) : null;
    if (helper) scene.add(helper);

    return { luz, helper };
  },
  //----------------------------------------------------------------//
  //                         LINTERNA
  //----------------------------------------------------------------//
  Focal: (
    color = 0xffffff,
    intensidad_max500 = 1,
    distancia_max20 = 0,
    amplitudDeLuz_max1 = Math.PI / 2,
    bordePenumbra_max1 = 0.1,
    posicion = [0, 5, 0],
    objetivo = [0, 0, 0],
    ayuda = true,
  ) => {
    // LUZ - Variable
    const luz = new THREE.SpotLight(
      color,
      intensidad_max500,
      distancia_max20,
      amplitudDeLuz_max1,
      bordePenumbra_max1,
    );
    // LUZ - Propiedades
    luz.position.set(...posicion);
    luz.target.position.set(...objetivo);

    scene.add(luz);
    scene.add(luz.target);

    // Helper
    const helper = ayuda ? new THREE.SpotLightHelper(luz) : null;
    if (helper) scene.add(helper);

    return { luz, helper };
  },
};

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
