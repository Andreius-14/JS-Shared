import GUI from "lil-gui";

//----------------------------------------------------------------//
//                        CORE
//----------------------------------------------------------------//

const panel = new GUI({ width: 310 });

//----------------------------------------------------------------//
//                        INSERTAR
//----------------------------------------------------------------//

const folder1 = panel.addFolder("Visibility");
const folder2 = panel.addFolder("Activation/Deactivation");
const folder3 = panel.addFolder("Pausing/Stepping");
const folder4 = panel.addFolder("Crossfading");
const folder5 = panel.addFolder("Blend Weights");
const folder6 = panel.addFolder("General Speed");

folder1.open();
folder2.open();
folder3.open();
folder4.open();
folder5.open();
folder6.open();

//----------------------------------------------------------------//
//                   OBJETO CONFIGURACION
//----------------------------------------------------------------//

// Este objeto lo creamos Nosotros somos libres
settings = {
  //Folder1
  "show model": true,
  "show skeleton": false,
  //Folder2
  "deactivate all": deactivateAllActions,
  "activate all": activateAllActions,
  //Folder3
  "pause/continue": pauseContinue,
  "make single step": toSingleStepMode,
  "modify step size": 0.05,
  //Cross
  "from walk to idle": () => {
    prepareCrossFade(walkAction, idleAction, 1.0);
  },
  "from idle to walk": () => {
    prepareCrossFade(idleAction, walkAction, 0.5);
  },
  "from walk to run": () => {
    prepareCrossFade(walkAction, runAction, 2.5);
  },
  "from run to walk": () => {
    prepareCrossFade(runAction, walkAction, 5.0);
  },
  //Cross Folder4
  "use default duration": true,
  "set custom duration": 3.5,
  //Folder5
  "modify idle weight": 0.0,
  "modify walk weight": 1.0,
  "modify run weight": 0.0,
  //Folder6
  "modify time scale": 1.0,
};

// FOLDER 1 -- Toggle
const states = [
  "Idle",
  "Walking",
  "Running",
  "Dance",
  "Death",
  "Sitting",
  "Standing",
];

const clipCtrl = statesFolder.add(api, "state").options(states);

clipCtrl.onChange(function () {
  fadeToAction(api.state, 0.5);
});

//----------------------------------------------------------------//
//                   INSERTAR - CONFIGURACION
//----------------------------------------------------------------//

// EL TIPO DE CONFIGURACION DETERMINA EL ESTILO QUE TENDRA
// BOOK - CHECK
// FUNCION - MENU Seleccionable
// NUMBRE - SINTONIZADORES

//-------------------------------------------------------------
// ↓↓↓↓↓↓↓↓↓ CHECK ↓↓↓↓↓↓↓↓↓↓↓↓
//-------------------------------------------------------------
//Folder1
folder1.add(settings, "show model").onChange(showModel); // CHECK - Booleano
folder1.add(settings, "show skeleton").onChange(showSkeleton); // CHECK - Booleano
//-------------------------------------------------------------
// ↓↓↓↓↓↓↓↓↓  Menu Seleccionable ↓↓↓↓↓↓↓↓↓↓↓↓
//-------------------------------------------------------------
//Folder2
folder2.add(settings, "deactivate all");
folder2.add(settings, "activate all");
//Folder3
folder3.add(settings, "pause/continue");
folder3.add(settings, "make single step");
//-------------------------------------------------------------
// ↓↓↓↓↓↓↓↓↓ Sintonizadores ↓↓↓↓↓↓↓↓↓↓↓↓
//-------------------------------------------------------------
folder3.add(settings, "modify step size", 0.01, 0.1, 0.001); //Sintonizadores
//-------------------------------------------------------------
// ↓↓↓↓↓↓↓↓↓  Menu Seleccionable ↓↓↓↓↓↓↓↓↓↓↓↓
//-------------------------------------------------------------
//cross
crossFadeControls.push(folder4.add(settings, "from walk to idle"));
crossFadeControls.push(folder4.add(settings, "from idle to walk"));
crossFadeControls.push(folder4.add(settings, "from walk to run"));
crossFadeControls.push(folder4.add(settings, "from run to walk"));
//Cross Folder4
folder4.add(settings, "use default duration"); // CHECK - Booleano

//-------------------------------------------------------------
// ↓↓↓↓↓↓↓↓↓  Sintonizadores ↓↓↓↓↓↓↓↓↓↓↓↓
//-------------------------------------------------------------

folder4.add(settings, "set custom duration", 0, 10, 0.01);
//Folder5
folder5
  .add(settings, "modify idle weight", 0.0, 1.0, 0.01)
  .listen()
  .onChange(function (weight) {
    setWeight(idleAction, weight);
  });
folder5
  .add(settings, "modify walk weight", 0.0, 1.0, 0.01)
  .listen()
  .onChange(function (weight) {
    setWeight(walkAction, weight);
  });
folder5
  .add(settings, "modify run weight", 0.0, 1.0, 0.01)
  .listen()
  .onChange(function (weight) {
    setWeight(runAction, weight);
  });
//Folder6
folder6
  .add(settings, "modify time scale", 0.0, 1.5, 0.01)
  .onChange(modifyTimeScale);

// function createFolder(gui, arrayDeNombres) {
//   const folder = {};
//   const indice = 1;
//   for (const item of arrayDeNombres) {
//     folder[indice] = gui.addFolder(item);
//     indice++;
//   }
// }
