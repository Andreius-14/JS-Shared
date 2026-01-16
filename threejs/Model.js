/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */
import * as THREE from 'three'
// Carga Modelo
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// Optimizador de Carga
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

import { enableShadows } from './_shared.js'
// ----------------------------------------------------------------//
//                     MODELOS GLTF
// ----------------------------------------------------------------//
export const gltfLoaderOptimizado = ({
    // cache = false,
    rutaDraco = 'jsm/libs/draco/gltf/'
} = {}) => {
    const draco = new DRACOLoader()
    const loader = new GLTFLoader()

    draco.setDecoderPath(rutaDraco)
    loader.setDRACOLoader(draco)

    // if (cache) {
    //   import("three").then(({ Cache }) => {
    //     Cache.enabled = true;
    //   });
    // }
    return loader
}

export const loadModelGlb = async (
    addToScene,
    ruta,
    { AllElements = false, optimizado = false } = {}
) => {
    try {
        const loader = optimizado ? gltfLoaderOptimizado() : new GLTFLoader()

        // Puedes usar loader.manager.onProgress si deseas progreso global
        const gltf = await loader.loadAsync(ruta)

        if (addToScene) addToScene.add(gltf.scene)

        return AllElements ? gltf : [gltf.scene, gltf.animations]
    } catch (error) {
        console.error(`Error loading ${ruta}:`, error)
        return null // o puedes volver a lanzar con throw error
    }
}

// export const loadModelGlb = (
//   addToScene,
//   ruta,
//   { AllElements = false, optimizado = false } = {},
// ) => {
//   return new Promise((resolve, reject) => {
//     const loader = optimizado ? gltfLoaderOptimizado() : new GLTFLoader();
//
//     loader.load(
//       ruta,
//       (gltf) => {
//         addToScene?.add(gltf.scene);
//         resolve(AllElements ? gltf : [gltf.scene, gltf.animations]);
//       },
//       (xhr) => {
//         const cargado = (xhr.loaded / xhr.total) * 100;
//         console.log(`${cargado.toFixed(2)}% loaded`);
//       },
//       (error) => {
//         console.error(`Error loading ${ruta}:`, error);
//         reject(error);
//       },
//     );
//   });
// };
// -------------------------------------//
//              HELPER
// -------------------------------------//
// 🦴 Opcional: crea un SkeletonHelper para debug de huesos
export function createSkeletonHelper(escena, modelo3D) {
    const skeleton = new THREE.SkeletonHelper(modelo3D)
    skeleton.visible = false
    escena?.add(skeleton)
    return skeleton
}

// -------------------------------------//
//        OBJETO UNIFICADOR
// -------------------------------------//
export const Model = {

    //herramienta
    gltfLoaderOptimizado,

    // Directo
    loadModelGlb,

    // Pluss
    createSkeletonHelper,
    enableShadows,

    // Minimalista
    Loader: gltfLoaderOptimizado,
    load: loadModelGlb,
    skeletonHelper: createSkeletonHelper
}
