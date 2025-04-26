import * as THREE from "three";
import { scene } from "./threejs_Escena_I.js";

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

export const carga = {
  textura: () => new THREE.TextureLoader(), // Carga texturas (.jpg, .png)
  cuboTextura: () => new THREE.CubeTextureLoader(), // Carga texturas de entorno (cubemaps)
  modelo: () => new THREE.GLTFLoader(), // Carga modelos 3D (.gltf, .glb)
  fuente: () => new THREE.FontLoader(), // Carga fuentes para texto 3D
};

//----------------------------------------------------------------//
//                   FUNCIONES - PRIVADAS
//----------------------------------------------------------------//
export function textureLoad(ruta) {
  return carga.textura().load(ruta);
}
//----------------------------------------------------------------//
//                   FUNCIONES - HERENCIA
//----------------------------------------------------------------//

//--> Imagen asignada a Textura
//--> Textura asignada a Material
export const AddImageMap = (objeto3D, ruta, textura) => {
  const tex = ruta ? textureLoad(ruta) : textura;
  tex.colorSpace = THREE.SRGBColorSpace; // Corrección gamma esencial
  //Material
  objeto3D.material.map = tex;
  objeto3D.material.needsUpdate = true;
};

export const AddImageNormalMap = (objeto3D, ruta, intensidadV2 = [1, 1]) => {
  const tex = textureLoad(ruta);
  tex.colorSpace = THREE.LinearSRGBColorSpace;
  //Material
  objeto3D.material.normalMap = tex;
  objeto3D.material.normalScale.set(...intensidadV2);
};
export const AddImageAO = (objeto3D, ruta, intensidad = 1.5) => {
  const tex = textureLoad(ruta);
  tex.colorSpace = THREE.LinearSRGBColorSpace;
  //Material
  objeto3D.material.aoMap = tex;
  objeto3D.material.aoMapIntensity = Math.min(intensidad, 2);
};

export const AddImageAlphaMap = (objeto3D, ruta) => {
  const tex = textureLoad(ruta);
  tex.colorSpace = THREE.SRGBColorSpace;
  //Material
  objeto3D.material.alphaMap = tex;
  objeto3D.material.transparent = true;
  objeto3D.material.side = THREE.DoubleSide; // Para ver ambos lados
  objeto3D.material.depthWrite = false; // Mejora renderizado transparente
};

//----------------------------------------------------------------//
//                   FUNCIONES - PUBLICAS
//----------------------------------------------------------------//

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
