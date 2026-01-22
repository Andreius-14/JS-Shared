/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */
import * as THREE from 'three'

// ╔═══════════════════╦══════════════════════════╦══════════════════════════╦══════════════════════════╗
// ║                   ║  DirectionalLight (Sol)  ║    SpotLight (Linterna)  ║  PointLight (Bombilla)   ║
// ╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
// ║     Dirección     ║     Paralela (→)         ║       Cono (↘)           ║   Omnidireccional (☇)    ║
// ╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
// ║      Target       ║       Opcional           ║      Obligatorio         ║       No aplica          ║
// ╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
// ║    Atenuación     ║          No              ║          Sí              ║   Sí (configurable)      ║
// ╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
// ║     Sombras       ║       Paralelas          ║       En cono            ║       Esféricas          ║
// ╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
// ║    Rendimiento    ║   ⚡️ Más eficiente       ║      ⚠️ Moderado          ║      💣 Costoso          ║
// ╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
// ║    Uso típico     ║     Luz diurna           ║   Focos/reflectores      ║ Lámparas/fuentes puntual.║
// ╚═══════════════════╩══════════════════════════╩══════════════════════════╩══════════════════════════╝

// ----------------------------------------------------------------//
//                        Clase LightBuilder
// ----------------------------------------------------------------//
export class LightBuilder {
    constructor(scene, color = 0xffffff, helper = false) {
        this.scene = scene
        this.color = color
        this.helper = helper
    }

    //          ╭─────────────────────────────────────────────────────────╮
    //          │                       Direccional                       │
    //          ╰─────────────────────────────────────────────────────────╯

    createDirectional({
        scene = this.scene,
        color = this.color,
        helper = this.helper,
        position = [5, 5, 5],
        objetivo = [0, 0, 0],
        intensity = 3,
        shadow = false
    } = {}) {
        const light = new THREE.DirectionalLight(color, intensity)
        light.position.set(...position)
        light.target.position.set(...objetivo)
        scene?.add(light, light.target)

        let help = null

        if (shadow) {
            this.addShadowToDirectional(light)
        }
        if (helper) {
            help = new THREE.DirectionalLightHelper(light)
            scene?.add(help)
            return [light, help]
        }

        return light
    }



    //          ╭─────────────────────────────────────────────────────────╮
    //          │                        Bombilla                         │
    //          ╰─────────────────────────────────────────────────────────╯
    createPoint({
        scene = this.scene,
        color = this.color,
        helper = this.helper,
        position = [0, 5, 0],
        intensity = 1,
        distance = 10,
    } = {}) {
        const light = new THREE.PointLight(color, intensity, distance)
        light.position.set(...position)

        const lightHelper = helper ? new THREE.PointLightHelper(light) : null

        scene?.add(light)

        if (lightHelper) {
            scene?.add(lightHelper)
            return [light, lightHelper]
        }

        return light
    }

    createSpot({
        scene = this.scene,
        color = this.color,
        helper = this.helper,
        position = [0, 5, 0],
        objetivo = [0, 0, 0],
        intensity = 1,
        distance = 10,
        angleGrados = 45,
        angleRadian = null,
        penumbraBorde = 0.1,
        shadow = false
    } = {}) {
        //nota: Dice que hay que eliminar el /2
        // const anguloConvertido = (angleGrados * THREE.MathUtils.DEG2RAD) / 2
        const angulo = angleRadian || (angleGrados * THREE.MathUtils.DEG2RAD) / 2;  // sin /2

        const light = new THREE.SpotLight(color, intensity)

        light.distance = distance
        light.angle = angulo
        light.penumbra = penumbraBorde
        light.castShadow = shadow
        light.position.set(...position)
        light.target.position.set(...objetivo)

        const lightHelper = helper ? new THREE.SpotLightHelper(light) : null

        scene?.add(light, light.target)

        if (lightHelper) {
            scene.add(lightHelper)
            return [light, lightHelper]
        }

        return light
    }

    //          ╭─────────────────────────────────────────────────────────╮
    //          │                         Shadow                          │
    //          ╰─────────────────────────────────────────────────────────╯

    addShadowToDirectional(
        light,
        {
            scene = this.scene,
            quality = 512,
            range = 2,
            near = 0.5,
            far = 30,
            radius = 2,
            bias = -0.005,
            helper = this.helper
        } = {}
    ) {
        // Habilita
        light.castShadow = true
        light.shadow.mapSize.set(quality, quality)

        let help
        const cam = light.shadow.camera
        cam.top = range
        cam.left = -range
        cam.right = range
        cam.bottom = -range
        cam.near = near
        cam.far = far

        light.shadow.bias = bias
        light.shadow.radius = radius

        if (helper) {
            help = new THREE.CameraHelper(cam)
            scene?.add(help)
        }

        return help
    }
    // ----------------------------------------------------------------//
    //                       ALIASES
    // ----------------------------------------------------------------//

    get Direccional() {
        return this.createDirectional
    }

    get Point() {
        return this.createPoint
    }

    get Spot() {
        return this.createSpot
    }

    // ES
    get Sol() {
        return ({
            position = [0, 20, 10], // Valores por defecto desestructurados
            color = this.color,
            intensity = 3,
            objetivo = [0, 0, 0],
            helper = false,
            shadow = false
        } = {}) => {
            // <- `= {}` evita errores si no se pasa nada
            return this.createDirectional({
                position,
                color,
                helper,
                intensity,
                objetivo,
                shadow
            })
        }
    }

    get Bombilla() {
        return this.createPoint
    }

    get Linterna() {
        return this.createSpot
    }

    // Sombras
    get shadowDirecional() {
        return this.addShadowToDirectional
    }

    get shadowD() {
        return this.addShadowToDirectional
    }
}
