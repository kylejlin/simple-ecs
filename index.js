class World {
  constructor(components) {
    this.entities = [];
    this.systems = [];
    this.Entity = this.createEntityClass_();
    this.Components = components;
    this.System = this.createSystemClass_();
  }

  update(dt) {
    const len = this.systems.length;
    for (let i = 0; i < len; i++) {
      this.systems[i].update(dt);
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

  createEntityClass_() {
    const { entities } = this;

    class Entity {
      addComponent(component) {
        this[component.constructor.name.toLowerCase()] = component;
        return this;
      }

      getComponent(componentConstructor) {
        return this[componentConstructor.name.toLowerCase()];
      }

      removeComponent(componentConstructor) {
        this[componentConstructor.name.toLowerCase()] = null;
        return this;
      }

      removeSelf() {
        const i = entities.indexOf(this);
        if (i > -1) {
          entities.splice(i, 1);
        }
        return this;
      }

      hasAll(componentConstructors) {
        const len = componentConstructors.length;
        for (let i = 0; i < len; i++) {
          const component = this.get(componentConstructors[i]);
          if (typeof component === 'undefined' || component === null) {
            return false;
          }
        }
        return true;
      }
    }

    return Entity;
  }

  createSystemClass_() {
    const { entities, } = this;
    const forEach = (componentConstructors, fn) => {
      const len = entities.length;
      for (let i = 0; i < len; i++) {
        const entity = entities[i];
        if (entity.hasAll(componentConstructors)) {
          // If fn returns true, stop.
          if (fn(entity)) {
            break;
          }
        }
        // If entity was removed by fn(), don't skip the next one.
        if (entity !== entities[i]) {
          i--;
        }
      }
    }

    class System {
      constructor(update) {
        this.update_ = update;
      }

      update(dt) {
        this.update_(dt, forEach);
      }
    }

    return System;
  }
}

export {
  World,
};
