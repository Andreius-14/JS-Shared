/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */
// export const cleanOld = (scene, renderer) => {
//     // Detener loop de animación
//     renderer.setAnimationLoop(null)
//
//     try {
//         console.log('Funcion beforeunload')
//         // 1. escena y recursos
//         scene.traverse((obj) => {
//             if (obj.isMesh || obj.isLine || obj.isPoints) {
//                 obj.geometry?.dispose() // Liberar geometría (con opcional chaining)
//                 if (obj.material) {
//                     Array.isArray(obj.material)
//                         ? obj.material.forEach((m) => m.dispose())
//                         : obj.material.dispose()
//                 }
//             }
//             if (obj.isLight || obj.isSprite) obj.dispose() // Luces y sprites
//             if (obj.texture) obj.texture.dispose() // Texturas
//         })
//
//         // 2. renderer
//         if (renderer) {
//             console.log('renderer existe')
//             renderer.dispose()
//             // renderer.forceContextLoss()  //para produccion
//             // renderer.domElement = null
//             // renderer = null // Eliminar referencia
//         }
//
//         // 3. Caché global
//         if (THREE.Cache) THREE.Cache.clear()
//     } catch (e) {
//         console.warn('Error al limpiar Three.js:', e)
//     }
// }
function clean_Scene(scene) {
    scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose()

        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach(m => m.dispose())
            } else {
                obj.material.dispose()
            }
            // Importante: liberar texturas del material
            for (const key in obj.material) {
                if (obj.material[key] && obj.material[key].isTexture) {
                    obj.material[key].dispose()
                }
            }
        }
    })

    scene.children.forEach(child => {
        if (child.shadow && child.shadow.map) {
            child.shadow.map.dispose()
        }
    })

    scene.clear()
}

function clean_Render(render) {
    render?.setAnimationLoop(null)

    render.dispose()
    render.forceContextLoss()

    if (render.domElement && render.domElement.parentNode) {
        render.domElement.parentNode.removeChild(render.domElement)
    }

    //   ╭─────────────────────────────────────────────────────────╮
    //   │             Se ejecuta Automaticamente                  │
    //   │        Solo en Desarrollo / Produccion  (HMR)           │
    //   ╰─────────────────────────────────────────────────────────╯
    // if (import.meta.hot) {
    //     render.dispose()
    //     render.forceContextLoss()
    //     render.domElement?.remove()
    //
    // }
}

function clean_Addons(stats, controls) {
    // stats - Control
    if (stats) {
        stats.dom?.remove()
        stats = null
    }

    if (controls) {
        controls.dispose()
        controls = null
    }
}
function clean_Event() {
    // offResize?.()
    // offFullScreen?.()
    // window.removeEventListener('beforeunload', destroy)
}

export function cleanAll(scene, renderer, stats = null, controls = null, cache = false) {
    console.log('[Clean] → Limpieza completa iniciada')

    try {
        clean_Scene(scene)
        clean_Render(renderer)
        clean_Addons(stats, controls)

        if (THREE.Cache?.clear && cache) {
            THREE.Cache.clear()
        }

        console.log('[Clean] → Limpieza completada')
    } catch (err) {
        console.error('[Clean] Error durante limpieza:', err)
    }
}


export const clean = {
    scene: clean_Scene,
    render: clean_Render,
    addon: clean_Addons,
    events: clean_Event

}
