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

  removeSelf(world) {
    const i = world.entities.indexOf(this);
    if (i > -1) {
      world.entities.splice(i, 1);
    }
    return this;
  }

  hasAll(componentConstructors) {
    const len = componentConstructors.length;
    for (let i = 0; i < len; i++) {
      const component = this.getComponent(componentConstructors[i]);
      if (typeof component === 'undefined' || component === null) {
        return false;
      }
    }
    return true;
  }
}

export default Entity;
