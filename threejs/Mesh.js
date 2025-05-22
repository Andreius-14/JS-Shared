import * as THREE from "three";

import { enableShadows } from "./_shared.js";

//----------------------------------------------------------------//
//                     Functions
//----------------------------------------------------------------//
export const geometriaBasica = {
  Cubo: (size = 1) => new THREE.BoxGeometry(size, size, size),

  Esfera: (radio = 0.7, segmentos = 32, anillos = 16) =>
    new THREE.SphereGeometry(radio, segmentos, anillos),

  Capsula: (radio = 1, alto = 1, segmentos = 4, anillos = 30) =>
    new THREE.CapsuleGeometry(radio, alto, segmentos, anillos),

  Cilindro: (radioTop = 0.5, radioBottom = 0.5, altura = 2, segmentos = 32) =>
    new THREE.CylinderGeometry(radioTop, radioBottom, altura, segmentos),

  Torus: (radio = 2, tubo = 0.5, segRadiales = 16, segTubulares = 50) =>
    new THREE.TorusGeometry(radio, tubo, segRadiales, segTubulares),

  Plano: (ancho = 1, alto = 1) => new THREE.PlaneGeometry(ancho, alto),
  // Agrega más geometrías personalizadas según sea necesario
};

export const materialesBasicos = {
  Color: () => new THREE.MeshBasicMaterial(),
  Sombra: () => new THREE.MeshStandardMaterial(),

  Normal: () => new THREE.MeshNormalMaterial(),
  Imagen: () => new THREE.MeshStandardMaterial(),
  RecibeSombra: () => new THREE.ShadowMaterial(),

  // Alias
  Drogas: () => new THREE.MeshNormalMaterial(),
  Reflectante: () => new THREE.MeshPhongMaterial(),
};

export function createGeometriaSimple(geometria, material, color) {
  const [g, m] = [geometria, material];
  m.color = new THREE.Color(color);

  return new THREE.Mesh(g, m);
}
export function createGeometria(
  escena,
  {
    geo = geometriaBasica.Esfera(),
    material = materialesBasicos.Drogas(),
    posicion = [0, 0, 0],
    rotacion = [0, 0, 0],
    escala = [1, 1, 1],
    nombre = null,
    color = null,
    shadow = false,
  } = {},
) {
  // Material
  const materialFinal = material.clone();
  if (color) materialFinal.color = new THREE.Color(color);

  // Objeto
  const objeto3D = new THREE.Mesh(geo, materialFinal);
  objeto3D.position.set(...posicion);
  objeto3D.rotation.set(...rotacion);
  objeto3D.scale.set(...escala);

  // Metadata
  if (nombre) objeto3D.name = nombre;
  if (shadow) enableShadows(objeto3D, true, true);
  if (escena) escena.add(objeto3D);

  return objeto3D;
}
//-------------------------------------//
//        OBJETO UNIFICADOR
//-------------------------------------//
export const geo = geometriaBasica;
export const mat = materialesBasicos;
export const geometria3D = createGeometria;

export const Mesh = {
  // Directo
  enableShadows,
  // Minimalista
  create: createGeometria,
  simple: createGeometriaSimple,
};
