//----------------------------------------------
// CANNON
//----------------------------------------------

import * as CANNON from "cannon-es";

export class FisicaBuilding {
  constructor() {
    this._world = new CANNON.World();
    this._world.gravity.set(0, -9.82, 0);
    this._world.broadphase = new CANNON.NaiveBroadphase();
    this._world.solver.iterations = 10;
  }

  static shape = {
    Plane: () => new CANNON.Plane(),
    Sphere: (radio = 1) => new CANNON.Sphere(radio),
    Box: (size = 1) => FisicaBuilding.shape.DetallesBox(size, size, size),
    Cylinder: (r = 1, h = 2, seg = 8) =>
      FisicaBuilding.shape.DetallesCylinder(r, r, h, seg),

    DetallesBox: (x = 1, y = 1, z = 1) =>
      new CANNON.Box(new CANNON.Vec3(x / 2, y / 2, z / 2)),

    DetallesCylinder: (rt = 1, rb = 1, h = 2, seg = 8) =>
      new CANNON.Cylinder(rt, rb, h, seg),
  };

  crearCuerpo(shape, { peso = 0, posicion = [0, 0, 0] } = {}) {
    const body = new CANNON.Body({ mass: peso });
    body.addShape(shape);
    body.position.set(...posicion);
    this._world.addBody(body);
    return body;
  }

  asignarAFisica(mesh, body) {
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);
  }

  actualizar(deltaTime = 1 / 60) {
    this._world.step(1 / 60, deltaTime, 3);
  }

  // Getter para acceder al mundo Cannon directamente
  get world() {
    return this._world;
  }
}
