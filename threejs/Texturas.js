/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */
import * as THREE from "three";

import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { toArray, esString, toRadians } from "./_shared.js";
//----------------------------------------------------------------//
//                     CARGADORES
//----------------------------------------------------------------//
const Loaders = {
    textura: () => new THREE.TextureLoader(),
    cuboTextura: () => new THREE.CubeTextureLoader(),
    modelo: () => new THREE.GLTFLoader(),
    fuente: () => new THREE.FontLoader(),
    hdr: () => new RGBELoader(),

    cubo: () => new THREE.CubeTextureLoader(),
    gltf: () => new THREE.GLTFLoader(),
};

export const Space = {
    Color: THREE.SRGBColorSpace, // (normal/roughness/metallic)
    Linear: THREE.LinearSRGBColorSpace,
    NoColor: THREE.NoColorSpace || null, //(heightmap, displacement)
};

//----------------------------------------------------------------//
//                            CARGA
//----------------------------------------------------------------//
function cargarTextura(ruta, colorSpace = Space.Color) {
    if (ruta?.isTexture) return ruta; // Más eficiente que instanceof

    try {
        const textura = Loaders.textura().load(ruta);
        textura.colorSpace = colorSpace;
        return textura;
    } catch (error) {
        console.error("Error cargando textura:", error);
        return null;
    }
}
async function cargarHDR(ruta) {
    if (ruta?.isTexture) return ruta;

    try {
        //
        const loader = Loaders.hdr();
        loader.setDataType(THREE.FloatType);
        //
        const texture = await loader.loadAsync(ruta);
        texture.colorSpace = THREE.LinearSRGBColorSpace || THREE.LinearEncoding;
        texture.mapping = THREE.EquirectangularReflectionMapping;
        //
        return texture;
    } catch (error) {
        console.error("Error cargando HDR:", error);
        return null;
    }
}

//----------------------------------------------------------------//
//                      CONFIGURACIONES (Extra)
//----------------------------------------------------------------//
function config_TexturaRepeat(renderer, textura, repeatXY) {
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const [x, y] = Array.isArray(repeatXY) ? repeatXY : [repeatXY, repeatXY];

    toArray(textura).forEach((tex) => {
        tex.repeat.set(x, y);
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.anisotropy = maxAnisotropy;
    });
}
function config_Material(objeto3D, { depthWrite, roughness } = {}) {
    //
    const m = objeto3D.material;
    //
    m.depthWrite = depthWrite;
    m.roughness = roughness;
}
//----------------------------------------------------------------//
//                  FUNCIONES PÚBLICAS
//----------------------------------------------------------------//
const AddMap = (objeto3D, ruta_Oh_Textura) => {
    const textura = cargarTextura(ruta_Oh_Textura, Space.Color);
    if (textura) {
        objeto3D.material.map = textura;
        objeto3D.material.needsUpdate = true;
    }
};

const AddAlphaMap = (objeto3D, ruta_Oh_Textura) => {
    const textura = cargarTextura(ruta_Oh_Textura, Space.Linear);
    if (textura) {
        objeto3D.material.alphaMap = textura;
        objeto3D.material.transparent = true;
        objeto3D.material.side = THREE.DoubleSide;
        objeto3D.material.depthWrite = false;
        objeto3D.material.needsUpdate = true;
    }
};

const AddNormalMap = (objeto3D, ruta_Oh_Textura, intensidadV2 = [1, 1]) => {
    const textura = cargarTextura(ruta_Oh_Textura, Space.Linear);
    if (textura) {
        objeto3D.material.normalMap = textura;
        objeto3D.material.normalScale.set(...intensidadV2);
        objeto3D.material.needsUpdate = true;
    }
};

const AddAO = (objeto3D, ruta_Oh_Textura, intensidad = 1.5) => {
    const textura = cargarTextura(ruta_Oh_Textura, Space.Linear);
    if (textura) {
        objeto3D.material.aoMap = textura;
        objeto3D.material.aoMapIntensity = Math.min(intensidad, 2);
        objeto3D.material.needsUpdate = true;
    }
};

const AddHDR = async (scene, ruta, { reflejo = true, fondo = false } = {}) => {
    const texture = await cargarHDR(ruta);
    if (!texture) return;
    if (reflejo) scene.environment = texture;
    if (fondo) scene.background = reflejo ? texture.clone() : texture;
};

//Mas Consumo
function AddBackgroundSphere(ruta, rotation = [0, 0, 0], radio = 1000) {
    const texture = cargarTextura(ruta, Space.Color);
    const array = toRadians(rotation);

    const g = new THREE.SphereGeometry(radio, 32, 24);
    const m = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
        depthWrite: false,
    });

    // g.scale(-1, 1, 1);

    const mesh = new THREE.Mesh(g, m);
    mesh.rotation.set(...array);
    return mesh;
}
//----------------------------------------------------------------//
//               OBJETO UNIFICADO DE TEXTURAS
//----------------------------------------------------------------//
export const Texturas = {
    // Puro
    AddMap,
    AddNormalMap,
    AddAlphaMap,
    AddHDR,

    AddBackgroundSphere,
    // Abreviacion
    map: AddMap,
    normal: AddNormalMap,
    alpha: AddAlphaMap,
    hdr: AddHDR,

    BgSphere: AddBackgroundSphere,
    // Descriptivo
    AddImageMap: AddMap,
    AddImageAlphaMap: AddAlphaMap,
    AddImageNormalMap: AddNormalMap,
    AddImageAO: AddAO,
    AddImageHdr: AddHDR,

    AddImageBgSphere: AddBackgroundSphere,
    // Extra
    load: cargarTextura,
    loadHdr: cargarHDR,

    Config: {
        Repeat: config_TexturaRepeat,
        Material: config_Material,
    },
};
