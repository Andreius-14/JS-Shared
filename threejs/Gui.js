import GUI from "lil-gui";

let gui;
let mixer;
const api = { state: "Walking" };
//----------------------------------------//
//            Function
//----------------------------------------//

function createGUI(model, animations) {
  //----------------------------------------------------------------//
  //                      VARIABLES - GUI
  //----------------------------------------------------------------//

  // GUI - Array
  const states = [
    "Idle",
    "Walking",
    "Running",
    "Dance",
    "Death",
    "Sitting",
    "Standing",
  ];
  // GUI - Array
  const emotes = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];
  actions = {};

  //----------------------------------------------------------------//
  //                        MIXER
  //----------------------------------------------------------------//
  // Instancia
  mixer = new THREE.AnimationMixer(model);

  // Recorre Animaciones
  for (let i = 0; i < animations.length; i++) {
    const clip = animations[i]; //--> Primera Animacion
    const action = mixer.clipAction(clip); //--> Carga Animacion

    // Rrellena el Objeto Actions
    actions[clip.name] = action;

    if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
    }
  }
  activeAction = actions["Walking"];
  activeAction.play();

  //----------------------------------------------------------------//
  //                        GUI - STATES
  //----------------------------------------------------------------//

  face = model.getObjectByName("Head_4");

  // GUI - Variables
  gui = new GUI();
  const statesFolder = gui.addFolder("States");
  const emoteFolder = gui.addFolder("Emotes");
  const expressionFolder = gui.addFolder("Expressions");

  statesFolder.open();
  emoteFolder.open();
  expressionFolder.open();

  // De AQui en Adelante no lo entiendo
  // GUI - Insertar Valores
  const clipCtrl = statesFolder.add(api, "state").options(states);

  // Animacion - Tiempo de Demora entre cambio de animacion
  clipCtrl.onChange(function () {
    fadeToAction(api.state, 0.5);
  });

  //----------------------------------------------------------------//
  //                        Expressions
  //----------------------------------------------------------------//

  const expressions = Object.keys(face.morphTargetDictionary);

  for (let i = 0; i < expressions.length; i++) {
    expressionFolder
      .add(face.morphTargetInfluences, i, 0, 1, 0.01)
      .name(expressions[i]);
  }

  //----------------------------------------------------------------//
  //                        EMOTES
  //----------------------------------------------------------------//

  for (let i = 0; i < emotes.length; i++) {
    createEmoteCallback(emotes[i]);
  }

  function createEmoteCallback(name) {
    api[name] = function () {
      fadeToAction(name, 0.2);
      mixer.addEventListener("finished", restoreState);
    };
    emoteFolder.add(api, name);
  }

  function restoreState() {
    mixer.removeEventListener("finished", restoreState);
    fadeToAction(api.state, 0.2);
  }
}
//----------------------------------------//
//            Function
//----------------------------------------//
function fadeToAction(name, duration) {
  previousAction = activeAction;
  activeAction = actions[name];

  if (previousAction !== activeAction) {
    previousAction.fadeOut(duration);
  }

  activeAction
    .reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(duration)
    .play();
}
