/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */
import * as THREE from "three";

//╔═══════════════════╦══════════════════════════╦══════════════════════════╦══════════════════════════╗
//║                   ║  DirectionalLight (Sol)  ║    SpotLight (Linterna)  ║  PointLight (Bombilla)   ║
//╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
//║     Dirección     ║     Paralela (→)         ║       Cono (↘)           ║   Omnidireccional (☇)    ║
//╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
//║      Target       ║       Opcional           ║      Obligatorio         ║       No aplica          ║
//╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
//║    Atenuación     ║          No              ║          Sí              ║   Sí (configurable)      ║
//╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
//║     Sombras       ║       Paralelas          ║       En cono            ║       Esféricas          ║
//╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
//║    Rendimiento    ║   ⚡️ Más eficiente       ║      ⚠️ Moderado          ║      💣 Costoso          ║
//╠═══════════════════╬══════════════════════════╬══════════════════════════╬══════════════════════════╣
//║    Uso típico     ║     Luz diurna           ║   Focos/reflectores      ║ Lámparas/fuentes puntual.║
//╚═══════════════════╩══════════════════════════╩══════════════════════════╩══════════════════════════╝

//----------------------------------------------------------------//
//                        Clase LightBuilder
//----------------------------------------------------------------//
export class LightBuilder {
    constructor(scene,color = 0xffffff, ayuda = false) {
        this.scene = scene
        this.color = color
        this.helper = ayuda
    }

    //----------------------------------------------------------------//
    //                       MÉTODOS PRINCIPALES
    //----------------------------------------------------------------//

    createDirectional({
        position = [5, 5, 5],
        objetivo = [0, 0, 0],
        intensity = 3,
        color = this.color,
        ayuda = this.helper,
        generaSombra = false,
    } = {}) {
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(...position);
        light.target.position.set(...objetivo);

        this.scene?.add(light, light.target);

        const lightHelper = ayuda ? new THREE.DirectionalLightHelper(light) : null;

        if (generaSombra) this.addShadowToDirectional(light);
        if (ayuda) {
            this.scene?.add(lightHelper);
            return [light, lightHelper];
        }

        return light;
    }

    addShadowToDirectional(
        light,
        {
            quality = 512,
            range = 2,
            near = 0.5,
            far = 30,
            radius = 2,
            bias = -0.005,
            helper = this.helper,
        } = {},
    ) {
        // Habilita
        light.castShadow = true;
        light.shadow.mapSize.set(quality, quality);

        let help;
        const cam = light.shadow.camera;
        cam.top = range;
        cam.left = -range;
        cam.right = range;
        cam.bottom = -range;
        cam.near = near;
        cam.far = far;

        light.shadow.bias = bias;
        light.shadow.radius = radius;

        if (helper) {
            help = new THREE.CameraHelper(cam);
            this.scene?.add(help);
        }

        return help;
    }

    createPoint({
        position = [0, 5, 0],
        color = this.color,
        intensity = 1,
        distance = 10,
        helper = this.helper
    } = {}) {
        const light = new THREE.PointLight(color, intensity, distance);
        light.position.set(...position);

        const lightHelper = helper ? new THREE.PointLightHelper(light) : null;

        this.scene?.add(light);

        if (lightHelper) {
            this.scene?.add(lightHelper);
            return [light, lightHelper];
        }

        return light;
    }

    createSpot({
        position = [0, 5, 0],
        objetivo = [0, 0, 0],
        color = this.color,
        intensity = 1,
        distance = 10,
        angleGrados = 45,
        angleRadian = null,
        penumbraBorde = 0.1,
        ayuda = this.helper,
        shadow = false,
    } = {}) {
        const anguloConvertido = (angleGrados * THREE.MathUtils.DEG2RAD) / 2;
        const angulo = angleRadian || anguloConvertido;

        const light = new THREE.SpotLight(color, intensity);

        light.distance = distance;
        light.angle = angulo;
        light.penumbra = penumbraBorde;
        light.castShadow = shadow;
        light.position.set(...position);
        light.target.position.set(...objetivo);

        const lightHelper = ayuda ? new THREE.SpotLightHelper(light) : null;

        this.scene?.add(light, light.target);

        if (lightHelper) {
            this.scene.add(lightHelper);
            return [light, lightHelper];
        }

        return light;
    }

    //----------------------------------------------------------------//
    //                       ALIASES
    //----------------------------------------------------------------//

    get Direccional() {
        return this.createDirectional;
    }
    get Point() {
        return this.createPoint;
    }
    get Spot() {
        return this.createSpot;
    }

    //ES
    get Sol() {
        return ({
            position = [0, 20, 10], // Valores por defecto desestructurados
            color = this.color,
            intensity = 3,
            objetivo = [0, 0, 0],
            ayuda = false,
            generaSombra = false,
        } = {}) => {
            // <- `= {}` evita errores si no se pasa nada
            return this.createDirectional({
                position,
                color,
                ayuda,
                intensity,
                objetivo,
                generaSombra,
            });
        };
    }
    get Bombilla() {
        return this.createPoint;
    }
    get Linterna() {
        return this.createSpot;
    }

    // Sombras
    get shadowDirecional() {
        return this.addShadowToDirectional;
    }
    get shadowD() {
        return this.addShadowToDirectional;
    }
}
