import * as THREE from "three";
import { scene } from "./Escena I.js";

export const Luces = {
  //----------------------------------------------------------------//
  //                           SOL
  //----------------------------------------------------------------//
  Sol: ({
    color = 0xffffff,
    intensidad = 1,
    posicion = [5, 5, 5],
    destino = [0, 0, 0],
    ayuda = true,
    insertar = true,
  } = {}) => {
    // LUZ
    const luz = new THREE.DirectionalLight(color, intensidad);
    luz.position.set(...posicion);
    luz.target.position.set(...destino);

    // Helper
    const helper = ayuda ? new THREE.DirectionalLightHelper(luz) : null;

    if (insertar) {
      scene.add(luz, luz.target);
      scene.add(helper);
    }

    return { luz, helper };
  },
  //----------------------------------------------------------------//
  //                      BOMBILLA - VELA [No Recomendado]
  //----------------------------------------------------------------//
  Bombilla: ({
    color = 0xffffff,
    intensidad = 1,
    distancia = 10,
    posicion = [0, 0, 0],
    ayuda = true,
    insertar = true,
  } = {}) => {
    // Luz
    const luz = new THREE.PointLight(color, intensidad, distancia);
    luz.position.set(...posicion);

    // Helper
    const helper = ayuda ? new THREE.PointLightHelper(luz) : null;

    if (insertar) {
      scene.add(luz);
      scene.add(helper);
    }

    return { luz, helper };
  },
  //----------------------------------------------------------------//
  //                         LINTERNA
  //----------------------------------------------------------------//
  Linterna: ({
    color = 0xffffff,
    intensidad = 1, // rango 0-1 o Mas
    distancia = 10,
    anguloDeLuz = 45,
    bordePenumbra_max1 = 0.1, // rango 0-1
    posicion = [0, 5, 0],
    objetivo = [0, 0, 0],
    ayuda = true,
    insertar = true,
  } = {}) => {
    // LUZ
    const angulo = anguloDeLuz * (Math.PI / 360);
    const luz = new THREE.SpotLight(
      color,
      intensidad,
      distancia,
      angulo,
      bordePenumbra_max1,
    );
    luz.position.set(...posicion);
    luz.target.position.set(...objetivo);

    // Helper
    const helper = ayuda ? new THREE.SpotLightHelper(luz) : null;

    if (insertar) {
      scene.add(luz, luz.target);
      scene.add(helper);
    }

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

// Esta bien si quieres simplificarlos mas es tu problema
