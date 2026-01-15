/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */
import * as THREE from 'three'
import { loadContenedor } from '../../core/shared-Dom.js'
import { camara } from './_Camara.js'
// Addons
import Stats from 'three/addons/libs/stats.module.js' // Consumo
import { OrbitControls } from 'three/addons/controls/OrbitControls.js' // Control de Camara
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js'

// ----------------------------------------------------------------//
//                    Funciones Antiguas
// ----------------------------------------------------------------//
export const createContenedor = loadContenedor
export const createCamara = camara.Perspective

//   ╭─────────────────────────────────────────────────────────╮
//   │                          Core                           │
//   ╰─────────────────────────────────────────────────────────╯
export const createScene = () => {
    return new THREE.Scene()
}

export const createRendererBasico = () => {
    return new THREE.WebGLRenderer({ antialias: true })
}

export const createRendererDirecto = (domCanvas, { configBasic = true, configRelista = false, container = null } = {}) => {
    const renderer = new THREE.WebGLRenderer({
        canvas: domCanvas,
        antialias: true
    })

    // Config
    if (configBasic) config_RendererBasico(renderer, container)
    if (configRelista) config_RendererRealista(renderer)

    return renderer
}
//   ╭─────────────────────────────────────────────────────────╮
//   │                          ADDON                          │
//   ╰─────────────────────────────────────────────────────────╯
export const createStats = (container, insertar = true) => {
    const stats = new Stats()
    if (insertar) container.appendChild(stats.dom)
    return stats
}

export const createControls = (camera, renderer_Or_Dom) => {
    const domElement = renderer_Or_Dom.domElement || renderer_Or_Dom
    if (!domElement) throw new Error('DOM inválido')
    const control = new OrbitControls(camera, domElement)
    control.minDistance = camera.near * 1.1
    control.maxDistance = camera.far * 0.9

    return control
}

const createControlFirstPerson = (
    camera,
    renderer,
    { activarClick = true, escena = null } = {} // Renombrado para claridad
) => {
    const element = renderer.domElement || renderer
    if (!element) throw new Error('Se requiere un canvas válido.')

    const controls = new PointerLockControls(camera, element)

    controls.pointerSpeed = 0.7
    // Si activamos el bloqueo por click
    if (activarClick) {
        element.addEventListener('click', () => {
            if (!controls.isLocked) controls.lock()
        })
    }

    if (escena) escena.add(controls.getObject())

    return controls
}

// ----------------------------------------------------------------//
//                            Camara
// ----------------------------------------------------------------//

export const create = {
    // Core
    scene: createScene,
    renderer: createRendererBasico,
    renderDirecto: createRendererDirecto,
    contenedor: createContenedor,
    // Addons
    stats: createStats,
    controls: createControls,
    controlFP: createControlFirstPerson,
    // Camara
    camera: createCamara,
    loadCamara: camara
}

// ----------------------------------------------------------------//
//                      Configuracion
// ----------------------------------------------------------------//
// Configuracion Basica -- Para Estilos CSS
export const config_Estilos = (container = null) => {
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.overflow = 'hidden' // Evita scrollbars

    if (container) {
        container.style.width = '100vw'
        container.style.height = '100vh'
        container.style.display = 'block'
    }
}

// ---------------------
//  RENDERER
// ---------------------
// Configuracion Basica -- [Siempre se Ejecuta]
const config_RendererBasico = (renderer, container) => {
    renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio, 2))
    renderer.setSize(globalThis.innerWidth, globalThis.innerHeight)
    if (container) {
        container.appendChild(renderer.domElement)
    }
}

// Configuracion Avanzada -- [Ejecucion Opcional]
const config_RendererRealista = (renderer) => {
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.5
    // renderer.outputColorSpace = THREE.SRGBColorSpace;
}

// ---------------------
//  RENDERER
// ---------------------
const config_controls = (
    controls,
    { zoom = true, soft = true, stopFloor = true } = {}
) => {
    controls.enableZoom = zoom
    controls.enableDamping = soft // Suavizar Movimiento
    if (stopFloor) controls.maxPolarAngle = Math.PI / 2 - 0.05
}

const config_Animation = (renderer, funcionAnimateName) => {
    renderer.setAnimationLoop(funcionAnimateName) // Inicia
}

export const config = {
    Estilos: config_Estilos,
    Renderer: config_RendererBasico,
    rRenderer: config_RendererRealista,
    Animation: config_Animation,
    Controls: config_controls
}
// ----------------------------------------------------------------//
//                      EXTRA
// ----------------------------------------------------------------//

export const extra_renderer = (renderer, { sombra = false, color } = {}) => {
    renderer.shadowMap.enabled = sombra
    if (color) renderer.setClearColor(color) // bg - Se recomienda el bg de World
}

export const extra_controls = (
    controls,
    { min, max, objetivo, desplazarXY = false, rotate = false } = {}
) => {
    controls.enablePan = desplazarXY
    controls.autoRotate = rotate

    if (min !== undefined) controls.minDistance = min
    if (max !== undefined) controls.maxDistance = max
    if (objetivo && Array.isArray(objetivo)) controls.target.set(...objetivo)
    controls.update()
}

export const extra_camera = (
    camera,
    { posicion, objetivo, helperScene } = {}
) => {
    if (posicion) camera.position.set(...posicion)
    if (objetivo) camera.lookAt(...objetivo)
    if (helperScene) {
        const helper = new THREE.CameraHelper(camera)
        helperScene.add(helper)
        return helper
    }
}

export const extra = {
    Controls: extra_controls,
    Renderer: extra_renderer,
    Camera: extra_camera
}
