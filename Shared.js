export function color(mensaje = "entrada") {
  console.log("");
  console.log(`\x1b[34m[${mensaje}]\x1b[0m`);
}

export const log = console.log;
