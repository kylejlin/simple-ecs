# simple-ecs
A simple entity-component-system setup.

## Usage example
```bash
npm install --save @kylejlin/simple-ecs
```

`components.js`
```javascript
class Hero {
  constructor() {
    this.health = 100;
    this.ammunition = 0;
  }
}

class Position {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Velocity {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export {
  Hero,
  Position,
  Velocity,
};
```

`index.js`
```javascript
import { World } from '@kylejlin/simple-ecs';
import * as components from './components';

const world = new World(components);
const { Entity, Components, System } = world;
const { Hero, Position, Velocity } = Components;

const bob = new Entity();
world.addEntity(bob);
bob.addComponent(new Hero());
bob.addComponent(new Position(0, 0, 0));
bob.addComponent(new Velocity(0, 0, 0));

const motion = new System((dt, forEach) => {
  forEach([Position, Velocity], (entity) => {
    const position = entity.getComponent(Position);
    const velocity = entity.getComponent(Velocity);
    
    position.x += velocity.x;
    position.y += velocity.y;
    position.z += velocity.z;
  });
});
world.addSystem(motion);

let then = Date.now();
const gameLoop = () => {
  requestAnimationFrame(render);

  const now = Date.now();
  const dt = now - then;
  then = now;

  world.update(dt);
};
gameLoop();
```

Note: this library is not transpiled.
If you plan to support older browsers, you'll have to set up Babel (or whatever transpiler choose) yourself.
