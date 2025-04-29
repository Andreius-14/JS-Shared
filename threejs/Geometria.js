import * as THREE from "three";

//----------------------------------------------------------------//
//                           OBJETO3D
//----------------------------------------------------------------//

// --> Objeto Puro
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

//----------------------------------------------------------------//
//                           FUNCTION
//----------------------------------------------------------------//
export function geometria3D(
  escena,
  {
    geometria = geo.Esfera(),
    material = materiales.Drogas(),
    posicion = [0, 0, 0],
    rotacion = [0, 0, 0],
    escala = [1, 1, 1],
    nombre = "",
    color = null,
    insertarToScene = true,
  } = {},
) {
  // Validación básica
  if (!escena?.isScene) throw new Error("Se requiere una escena válida");

  // Configurar material
  const materialFinal = material.clone();
  if (color) materialFinal.color = new THREE.Color(color);

  // Crear mesh
  const objeto3D = new THREE.Mesh(geometria, materialFinal);

  // Transformaciones
  objeto3D.position.set(...posicion);
  objeto3D.rotation.set(...rotacion);
  objeto3D.scale.set(...escala);

  // Metadata
  if (nombre) objeto3D.name = nombre;
  if (insertarToScene) escena.add(objeto3D);

  return objeto3D;
}
