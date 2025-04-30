// Core
import * as THREE from "three";
import {
  config_Estilos,
  config_Renderer,
  createCamara,
  createContenedor,
  createControls,
  createRenderer,
  createScene,
  createStats,
} from "./Escena.js";
import { EventoFullScreen, EventoResize } from "./Evento.js";

//----------------------------------------------------------------//
//                         INIT
//----------------------------------------------------------------//
export const scene = createScene();
export const camera = createCamara(); //Recomendado (500)
export const renderer = createRenderer();
export const box3D = createContenedor("Contenedor3D");
// ADDON
export const stats = createStats(box3D);
export const controls = createControls(camera, renderer);

//----------------------------------------------------------------//
//                         Eventos
//----------------------------------------------------------------//
function initThreeJS() {
  //Config
  config_Estilos();
  config_Renderer(renderer, box3D);

  //Eventos
  EventoFullScreen(renderer);
  EventoResize(camera, renderer);
}

//----------------------------------------------------------------//
//                         Listener
//----------------------------------------------------------------//
globalThis.addEventListener("DOMContentLoaded", initThreeJS);
