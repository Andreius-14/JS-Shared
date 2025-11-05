export const log = console.log;


//=============================
//    Mensajes de Consola
//=============================
function msm(...args) {
  console.log(...args);
}
msm.red = console.error;
msm.yellow = console.warn;
msm.info = console.info;

//=============================
//           Extra
//=============================
export function color(mensaje = "entrada") {
  console.log("");
  console.log(`\x1b[34m[${mensaje}]\x1b[0m`);
}


