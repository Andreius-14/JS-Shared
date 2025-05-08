import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { enableShadows } from "./_shared.js";
//----------------------------------------------------------------//
//                     MODELOS GLTF
//----------------------------------------------------------------//
export const loadModelGlb = (
  addToScene,
  ruta,
  { AllElements = false } = {},
) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

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
  createSkeletonHelper,
  enableShadows,
  // Minimalista
  load: loadModelGlb,
  skeletonHelper: createSkeletonHelper,
};
