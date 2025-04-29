import * as THREE from "three";
import { scene } from "./Escena I.js";

//----------------------------------------------------------------//
//                           OBJETO3D
//----------------------------------------------------------------//

//----------------//
//      BASIC
//----------------//

// --> Objeto Puro
// --> Solo Lo Basico -  Keep Simple
export const geo = {
  Cubo: (ancho = 1, alto = 1, profundidad = 1) => {
    return new THREE.BoxGeometry(ancho, alto, profundidad);
  },
  Esfera: (radio = 0.7, segmentos = 32, anillos = 16) => {
    return new THREE.SphereGeometry(radio, segmentos, anillos);
  },
  Capsula: (radio = 1, alto = 1, segmentos = 4, anillos = 30) => {
    return new THREE.CapsuleGeometry(radio, alto, segmentos, anillos);
  },
  Cilindro: (radioTop = 0.5, radioBottom = 0.5, altura = 2, segmentos = 32) => {
    return new THREE.CylinderGeometry(radioTop, radioBottom, altura, segmentos);
  },
  Torus: (radio = 2, tubo = 0.5, segRadiales = 16, segTubulares = 50) => {
    return new THREE.TorusGeometry(radio, tubo, segRadiales, segTubulares);
  },
  Plano: (ancho = 1, alto = 1) => {
    return new THREE.PlaneGeometry(ancho, alto);
  },
  // Agrega más geometrías personalizadas según sea necesario
};

// OBJETOS - VARIABLES
export const materiales = {
  color: () => new THREE.MeshBasicMaterial(),
  Sombra: () => new THREE.MeshStandardMaterial(),
  Drogas: () => new THREE.MeshNormalMaterial(),
  recibeImagen: () => new THREE.MeshStandardMaterial(),
  recibeSombra: () => new THREE.ShadowMaterial(),
  // Agrega Mas
};

//----------------//
//  PERSONALIZADO
//----------------//
export function geometria3D({
  geometria = geo.Esfera(),
  material = materiales.Drogas(),
  posicion = [0, 0, 0],
  rotacion = [0, 0, 0],
  escala = [1, 1, 1],
  nombre = "",
  color = null,
  insertarToScene = true,
} = {}) {
  if (color) material.color = new THREE.Color(color);

  // Crear el objeto 3D
  const objeto3D = new THREE.Mesh(geometria, material);

  // Configurar propiedades del objeto
  objeto3D.position.set(...posicion);
  objeto3D.rotation.set(...rotacion);
  objeto3D.scale.set(...escala);

  if (nombre) objeto3D.name = nombre;
  if (insertarToScene) scene.add(objeto3D);

  return objeto3D;
}
