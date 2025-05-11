import * as THREE from "three";
// Carga Modelo
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// Optimizador de Carga
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

import { enableShadows } from "./_shared.js";
//----------------------------------------------------------------//
//                     MODELOS GLTF
//----------------------------------------------------------------//
export const createLoader = ({
  // cache = false,
  rutaDraco = "jsm/libs/draco/gltf/",
} = {}) => {
  const draco = new DRACOLoader();
  const loader = new GLTFLoader();

  draco.setDecoderPath(rutaDraco);
  loader.setDRACOLoader(draco);

  // if (cache) {
  //   import("three").then(({ Cache }) => {
  //     Cache.enabled = true;
  //   });
  // }
  return loader;
};

export const loadModelGlb = (
  addToScene,
  ruta,
  { AllElements = false, objLoader = null } = {},
) => {
  return new Promise((resolve, reject) => {
    const loader = objLoader || new GLTFLoader();

    loader.load(
      ruta,
      (gltf) => {
        addToScene?.add(gltf.scene);
        resolve(AllElements ? gltf : [gltf.scene, gltf.animations]);
      },
      (xhr) => {
        const cargado = (xhr.loaded / xhr.total) * 100;
        console.log(`${cargado.toFixed(2)}% loaded`);
      },
      (error) => {
        console.error(`Error loading ${ruta}:`, error);
        reject(error);
      },
    );
  });
};

//-------------------------------------//
//              HELPER
//-------------------------------------//
// 🦴 Opcional: crea un SkeletonHelper para debug de huesos
export function createSkeletonHelper(escena, modelo3D) {
  const skeleton = new THREE.SkeletonHelper(modelo3D);
  skeleton.visible = false;
  escena?.add(skeleton);
  return skeleton;
}

//-------------------------------------//
//        OBJETO UNIFICADOR
//-------------------------------------//
export const Model = {
  // Directo
  loadModelGlb,
  createLoader,
  createSkeletonHelper,
  enableShadows,
  // Minimalista
  Loader: createLoader,
  load: loadModelGlb,
  skeletonHelper: createSkeletonHelper,
};
