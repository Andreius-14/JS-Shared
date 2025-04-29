import * as THREE from "three";
//----------------------------------------------------------------//
//                         LOADER
//----------------------------------------------------------------//

export const carga = {
  textura: () => new THREE.TextureLoader(), // Carga texturas (.jpg, .png)
  cuboTextura: () => new THREE.CubeTextureLoader(), // Carga texturas de entorno (cubemaps)
  modelo: () => new THREE.GLTFLoader(), // Carga modelos 3D (.gltf, .glb)
  fuente: () => new THREE.FontLoader(), // Carga fuentes para texto 3D
};

export const colorTextura = {
  paraWeb: THREE.SRGBColorSpace, // Estándar web/sRGB
  paraFisica: THREE.LinearSRGBColorSpace, // Espacio lineal
  //HDR_SRGB: THREE.SRGB3DLColorSpace, // HDR en sRGB
  DISPLAY_P3: THREE.DisplayP3ColorSpace, // Gama amplia (DCI-P3)
};

//----------------------------------------------------------------//
//                         TEXTURAS
//----------------------------------------------------------------//

//  Imagen -> Textura -> Material
export async function textureLoad(ruta) {
  const texture = await carga.textura().loadAsync(ruta);
  return texture;
}
//----------------//
//  PERSONALIZADO
//----------------//
export const AddImageMap = async (objeto3D, ruta, textura) => {
  const tex = ruta ? await textureLoad(ruta) : textura;
  if (tex) {
    tex.colorSpace = colorTextura.paraWeb;
    objeto3D.material.map = tex;
    objeto3D.material.needsUpdate = true;
  }
};

export const AddImageAlphaMap = async (objeto3D, ruta) => {
  const tex = await textureLoad(ruta);
  if (tex) {
    tex.colorSpace = colorTextura.paraWeb;
    objeto3D.material.alphaMap = tex;
    objeto3D.material.transparent = true;
    objeto3D.material.side = THREE.DoubleSide;
    objeto3D.material.depthWrite = false;
    objeto3D.material.needsUpdate = true;
  }
};

export const AddImageNormalMap = async (
  objeto3D,
  ruta,
  intensidadV2 = [1, 1],
) => {
  const tex = await textureLoad(ruta);
  if (tex) {
    tex.colorSpace = colorTextura.paraFisica;
    objeto3D.material.normalMap = tex;
    objeto3D.material.normalScale.set(...intensidadV2);
    objeto3D.material.needsUpdate = true;
  }
};

export const AddImageAO = async (objeto3D, ruta, intensidad = 1.5) => {
  const tex = await textureLoad(ruta);
  if (tex) {
    tex.colorSpace = colorTextura.paraFisica;
    objeto3D.material.aoMap = tex;
    objeto3D.material.aoMapIntensity = Math.min(intensidad, 2);
    objeto3D.material.needsUpdate = true;
  }
};
