import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//----------------------------------------------------------------//
//                     CARGADORES
//----------------------------------------------------------------//
const Loaders = {
  textura: () => new THREE.TextureLoader(),
  cuboTextura: () => new THREE.CubeTextureLoader(),
  modelo: () => new THREE.GLTFLoader(),
  fuente: () => new THREE.FontLoader(),
};

//----------------------------------------------------------------//
//                  FUNCIÓN PRIVADA DE CARGA
//----------------------------------------------------------------//
async function cargarTextura(ruta) {
  try {
    const textura = await Loaders.textura().loadAsync(ruta);
    textura.colorSpace = THREE.SRGBColorSpace;
    return textura;
  } catch (error) {
    console.error("Error cargando textura:", error);
    return null;
  }
}

export const cargarModeloGlb = (ruta, onProgress) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      ruta,
      (gltf) => resolve([gltf.scene, gltf.animations]), // ← Ahora devuelve array
      (xhr) => {
        const progress = (xhr.loaded / xhr.total) * 100;
        onProgress?.(progress) || console.log(`${progress.toFixed(2)}% loaded`);
      },
      (error) => {
        console.error(`Error loading ${ruta}:`, error);
        reject(new Error(`Failed to load model: ${error.message}`));
      },
    );
  });
}; //const loader = new GLTFLoader();
//loader.load(
//  "./RobotExpressive/RobotExpressive.glb",
//  (gltf) => {
//    model = gltf.scene;
//    scene.add(model);
//
//    createGUI(model, gltf.animations);
//  },
//  undefined,
//  (e) => {
//    console.error(e);
//  },
//);
//----------------------------------------------------------------//
//                  FUNCIONES PÚBLICAS
//----------------------------------------------------------------//
export const AddMap = async (objeto3D, ruta) => {
  const textura = await cargarTextura(ruta);
  if (textura) {
    objeto3D.material.map = textura;
    objeto3D.material.needsUpdate = true;
  }
};

export const AddAlphaMap = async (objeto3D, ruta) => {
  const textura = await cargarTextura(ruta);
  if (textura) {
    objeto3D.material.alphaMap = textura;
    objeto3D.material.transparent = true;
    objeto3D.material.side = THREE.DoubleSide;
    objeto3D.material.depthWrite = false;
    objeto3D.material.needsUpdate = true;
  }
};

export const AddNormalMap = async (objeto3D, ruta, intensidadV2 = [1, 1]) => {
  const textura = await cargarTextura(ruta);
  if (textura) {
    textura.colorSpace = THREE.LinearSRGBColorSpace;
    objeto3D.material.normalMap = textura;
    objeto3D.material.normalScale.set(...intensidadV2);
    objeto3D.material.needsUpdate = true;
  }
};

export const AddAO = async (objeto3D, ruta, intensidad = 1.5) => {
  const textura = await cargarTextura(ruta);
  if (textura) {
    textura.colorSpace = THREE.LinearSRGBColorSpace;
    objeto3D.material.aoMap = textura;
    objeto3D.material.aoMapIntensity = Math.min(intensidad, 2);
    objeto3D.material.needsUpdate = true;
  }
};

//----------------------------------------------------------------//
//               OBJETO UNIFICADO DE TEXTURAS
//----------------------------------------------------------------//
export const Texturas = {
  // Nombres técnicos
  base: AddMap,
  alpha: AddAlphaMap,
  normal: AddNormalMap,
  ao: AddAO,

  // Aliases descriptivos
  mapaBase: AddMap,
  mapaAlpha: AddAlphaMap,
  mapaNormal: AddNormalMap,
  mapaAO: AddAO,

  // Aliases de funciones originales (opcionales)
  AddImageMap: AddMap,
  AddImageAlphaMap: AddAlphaMap,
  AddImageNormalMap: AddNormalMap,
  AddImageAO: AddAO,
};

// Uso recomendado:
// Texturas.base(miModelo, 'ruta/textura.jpg')
// Texturas.mapaNormal(miModelo, 'ruta/normal.jpg', [1.2, 1.2])
