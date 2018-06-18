class World {
  constructor() {
    this.entities = [];
    this.systems = [];
  }

  update(data) {
    const len = this.systems.length;
    for (let i = 0; i < len; i++) {
      this.systems[i].update(data, this);
    }
    return this;
  }

  addEntity(entity) {
    this.entities.push(entity);
    return this;
  }

  addSystem(system) {
    this.systems.push(system);
    return this;
  }

  removeEntity(entity) {
    const i = this.entities.indexOf(entity);
    if (i > -1) {
      this.entities.splice(i, 1);
    }
    return this;
  }

  removeSystem(system) {
    const i = this.systems.indexOf(system);
    if (i > -1) {
      this.systems.splice(i, 1);
    }
    return this;
  }

  forEach(componentConstructors, fn) {
    const len = this.entities.length;
    for (let i = 0; i < len; i++) {
      const entity = this.entities[i];
      if (entity.hasAll(componentConstructors)) {
        // If fn returns true, stop.
        if (fn(entity)) {
          break;
        }
      }
      // If entity was removed by fn(), don't skip the next one.
      if (entity !== this.entities[i]) {
        i--;
      }
    }
  }
}

export default World;
