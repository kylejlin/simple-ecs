class System {
  constructor(update) {
    this.update_ = update;
  }

  update(data, world) {
    this.update_(data, world);
  }
}

export default System;
