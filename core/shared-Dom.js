/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */
import { _isHTML, _idDisponible } from './__Bool.js'
// ----------------------------------------------------------------//
//                         NIVEL: FACIL
// ----------------------------------------------------------------//
// [01]
export function enlaceId(id = '') {
    const element = document.getElementById(id)
    return element || null
}

export function enlaceClass(clase = '') {
    const elements = document.getElementsByClassName(clase)
    return elements.length ? elements : null
}

// [02]
export function enlaceCss(regla = '', all = false) {
    const element = all
        ? document.querySelectorAll(regla)
        : document.querySelector(regla)
    return element || null
}

// ----------------------------------------------------------------//
//                         NIVEL: Accion
// ----------------------------------------------------------------//
export function _insertar(padre, hijo) {
    if (padre && hijo) padre.appendChild(hijo)
    else console.warn('insertar(): faltan nodo padre o hijo válidos')
}

// ----------------------------------------------------------------//
//                         NIVEL: MEDIO
// ----------------------------------------------------------------//
export function _insertarBy({ child, parentID, parentClass, parentNode } = {}) {
    const select =
        enlaceId(parentID) || parentNode || enlaceClass(parentClass)?.[0]
    const parent = _isHTML(select) ? select : document.body

    _insertar(parent, child)
    return child
}

export function makeHtml(nodo = '', { id = '', classes = [], txt = '' } = {}) {
    // Bool
    if (id && !_idDisponible(id)) return null
    // Make
    const element = document.createElement(nodo)
    // Propiedades Opcionales
    if (id) element.id = id
    if (txt) element.textContent = txt
    if (classes.length > 0) element.classList.add(...classes)
    return element
}

export function loadContenedor(id = 'container', idDad = null, { insert = true } = {}) {
    const dad = enlaceId(idDad) || document.body
    const child = enlaceId(id) || makeHtml('div', { id })

    if (insert) _insertar(dad, child)
    return child
}
// Inserta Elemento - Buscando al Padre a partir del Id Class o Node
