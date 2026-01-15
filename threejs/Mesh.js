/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */
import * as THREE from 'three'

import { enableShadows } from './_shared.js'

// ----------------------------------------------------------------//
//                     Functions
// ----------------------------------------------------------------//
const geometriaBasica = {
    Cubo: (size = 1) => new THREE.BoxGeometry(size, size, size),

    Esfera: (radio = 0.7, segmentos = 32, anillos = 16) =>
        new THREE.SphereGeometry(radio, segmentos, anillos),

    Capsula: (radio = 1, alto = 1, segmentos = 4, anillos = 30) =>
        new THREE.CapsuleGeometry(radio, alto, segmentos, anillos),

    Cilindro: (radioTop = 0.5, radioBottom = 0.5, altura = 2, segmentos = 32) =>
        new THREE.CylinderGeometry(radioTop, radioBottom, altura, segmentos),

    Torus: (radio = 2, tubo = 0.5, segRadiales = 16, segTubulares = 50) =>
        new THREE.TorusGeometry(radio, tubo, segRadiales, segTubulares),

    Plano: (ancho = 1, alto = 1) => new THREE.PlaneGeometry(ancho, alto)
    // Agrega más geometrías personalizadas según sea necesario
}

const materialesBasicos = {
    Color: () => new THREE.MeshBasicMaterial(),
    Sombra: () => new THREE.MeshStandardMaterial(),

    Normal: () => new THREE.MeshNormalMaterial(),
    Imagen: () => new THREE.MeshStandardMaterial(),
    RecibeSombra: () => new THREE.ShadowMaterial(),

    // Alias
    Drogas: () => new THREE.MeshNormalMaterial(),
    Reflectante: () => new THREE.MeshPhongMaterial()
}

const basic = {
    geo: geometriaBasica,
    mat: materialesBasicos
}

export function createGeometriaSimple(geometria, material, color) {
    const [g, m] = [geometria, material]
    m.color = new THREE.Color(color)
    return new THREE.Mesh(g, m)
}
export function createGeometria(
    escena,
    {
        geo = basic.geo.Esfera(),
        material = basic.mat.Drogas(),
        posicion = [0, 0, 0],
        rotacion = [0, 0, 0],
        escala = [1, 1, 1],
        nombre = null,
        color = null,
        shadow = false
    } = {}
) {
    // Material
    const _material = material.clone()
    if (color) _material.color = new THREE.Color(color)

    // Objeto
    const objeto = new THREE.Mesh(geo, _material)
    objeto.position.set(...posicion)
    objeto.rotation.set(...rotacion)
    objeto.scale.set(...escala)

    // Metadata
    if (nombre) objeto.name = nombre
    if (shadow) enableShadows(objeto, true, true)
    if (escena) escena.add(objeto)

    return objeto
}
// -------------------------------------//
//        OBJETO UNIFICADOR
// -------------------------------------//
export const geo = geometriaBasica
export const mat = materialesBasicos

export const Mesh = {
    // Directo
    enableShadows,
    // Minimalista
    create: createGeometria,
    simple: createGeometriaSimple
}
