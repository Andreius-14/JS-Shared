import * as THREE from "three";
import { scene } from "./threejs_Escena_I.js";

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// // const material = new THREE.MeshBasicMaterial( { color: 0x44aa88 } ); //!Sombra
// // const material = new THREE.MeshStandardMaterial( { color: 0x44aa88 } ); //Sombra
// const material = new THREE.MeshNormalMaterial(); //Drogas

// export const cube = new THREE.Mesh(geometry, material);

// OBJETOS - VARIABLES
export const text = {
  color: () => new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  Sombra: () => new THREE.MeshStandardMaterial(),
  Drogas: () => new THREE.MeshNormalMaterial(),
  recibeSombra: () => new THREE.ShadowMaterial(),
  imagen: () => new THREE.TextureLoader(),
  // Agrega Mas
};

// export const geo = {
//     Esfera: new THREE.SphereGeometry(0.7, 32, 16),
//     Capsula: new THREE.CapsuleGeometry(1,1,4,30),
//     Cilindro: new THREE.CylinderGeometry(0.5, 0.5, 2, 32),
//     cubo: new THREE.BoxGeometry(1, 1, 1),
//     toru: new THREE.TorusGeometry( 2, 0.5, 16, 50 ),
//     plano: new THREE.PlaneGeometry(),
//     // Agrega Mas [Completo]
// };

export const geo = {
  Esfera: (radio = 0.7, segmentos = 32, anillos = 16) => {
    return new THREE.SphereGeometry(radio, segmentos, anillos);
  },
  Capsula: (radio = 1, alto = 1, segmentos = 4, anillos = 30) => {
    return new THREE.CapsuleGeometry(radio, alto, segmentos, anillos);
  },
  Cilindro: (
    radioSuperior = 0.5,
    radioInferior = 0.5,
    altura = 2,
    segmentos = 32,
  ) => {
    return new THREE.CylinderGeometry(
      radioSuperior,
      radioInferior,
      altura,
      segmentos,
    );
  },
  cubo: (ancho = 1, alto = 1, profundidad = 1) => {
    return new THREE.BoxGeometry(ancho, alto, profundidad);
  },
  torus: (
    radio = 2,
    tubo = 0.5,
    segmentosRadiales = 16,
    segmentosTubulares = 50,
  ) => {
    return new THREE.TorusGeometry(
      radio,
      tubo,
      segmentosRadiales,
      segmentosTubulares,
    );
  },
  plano: (ancho = 1, alto = 1) => {
    return new THREE.PlaneGeometry(ancho, alto);
  },
  // Agrega más geometrías personalizadas según sea necesario
};

// console.log(geo.Esfera);
//----------------------------------------------------------------//

// TEMA - GEOMETRIA
export const geometria3D = (
  geometria = geo.Esfera(),
  textura = text.Drogas(),
  posicion = [0, 0, 0],
  color = 0x00ff00,
  escena = scene,
) => {
  // console.log(geometria);
  let materialGeo = textura;
  // if (materialGeo!= text.Drogas()){
  materialGeo.color = new THREE.Color(color);
  // }

  const objeto = new THREE.Mesh(geometria, materialGeo);
  objeto.position.set(...posicion);
  escena.add(objeto);

  return objeto;
};

// TEMA - TEXTURAS

function loadImage(ruta) {
  return text.imagen().load(ruta);
}

export const geo3DImage = (
  geometria = geo.Esfera(),
  ruta = "",
  posicion = [0, 0, 0],
  escena = scene,
) => {
  let material = text.Sombra();
  if (ruta !== "") {
    material.map = loadImage(ruta);
  }
  //
  // console.log(material.map);

  let _3D = new THREE.Mesh(geometria, material);
  _3D.position.set(...posicion);

  escena.add(_3D);
  return _3D;
};

export const AddImageNormal = (objeto, ruta = "", intensidadV2 = [20, 20]) => {
  // [Superficie Rugosa]
  objeto.material.normalMap = loadImage(ruta);
  objeto.material.normalScale = new THREE.Vector2(...intensidadV2);
  // console.log(objeto.material.normalMap);
};
export const AddImageAO = (objeto, ruta, intensidad = 0.5) => {
  // [sombra] - [Intensidad: 0 - 1]
  objeto.material.aoMap = loadImage(ruta);
  objeto.material.aoMapIntensity = intensidad;
};

export const AddImageAlphaMap = (objeto, ruta) => {
  objeto.material.alphaMap = loadImage(ruta);
  objeto.material.transparent = true;
};

