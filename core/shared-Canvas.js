/* eslint indent: "off" */
/* eslint-disable space-before-function-paren */
import { makeHtml, _insertar } from "./shared-Dom.js";

//━━━━━━━━━━━━━━━━━━━━━
//       Make
//━━━━━━━━━━━━━━━━━━━━━

export function makeContainer(id = "container") {
    const box = makeHtml("div", { id: id });
    return box;
}

export function makeCanvas({ width = 500, height = 1000, htmlID = "canvas" }) {
    const canvas = makeHtml("canvas");
    canvas.id = htmlID;
    canvas.width = width;
    canvas.height = height;
    canvas.classList.add(htmlID);
    return canvas;
}

//━━━━━━━━━━━━━━━━━━━━━
//     Insert
//━━━━━━━━━━━━━━━━━━━━━
// export function insert_Container(boxID = "", parentID = "") {
//   const boxDad = enlaceId(parentID) || document.body;
//   const boxChild = enlaceId(boxID) || makeContainer(boxID);
//
//   _insertar(boxDad, boxChild);
//
//   return boxChild;
// }
// export function insert_Canvas(boxID = "", parentID = "") {
//   const boxDad = enlaceId(parentID) || document.body;
//   const boxChild = enlaceId(boxID) || makeCanvas({ htmlID: boxID });
//
//   _insertar(boxDad, boxChild);
//
//   return boxChild;
// }

//----------------------------------------------------------------//
//                         NIVEL: MEDIO
//----------------------------------------------------------------//
export function makeGrid(width = 5, height = 10) {
    return Array(height)
        .fill()
        .map(() => Array(width).fill(0));
}
