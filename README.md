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

## Docs

### `class World`
#### `World::constructor(components) -> this`
#### `World::update(data) -> this`
Calls `update()` on each of its systems.

`data` is a optional argument.
If you provide it a value, it will get passed down to each of this world's systems.
Most people like to pass in the milliseconds since the last update, but you can use this however you'd like.
#### `World::addEntity(entity) -> this`
Adds `entity` to `this.entities`.
#### `World::addSystem(system) -> this`
Adds `system` to `this.systems`.
#### `World::removeEntity(entity) -> this`
Remove `entity` from `this.entities`.
#### `World::removeSystem(system) -> this`
Remove `system` from `this.systems`.
#### `World::entities`
The array of all this world's entities.
#### `World::systems`
The array of all this world's systems.
#### `World::Entity`
A class that creates an entity scoped to this world.
#### `World::System`
A class that creates a system scoped to this world.
#### `World::Components`
A dictionary of all components used by this world.

### `class World::Entity`
#### `Entity::addComponent(component) -> this`
#### `Entity::removeComponent(component) -> this`
#### `Entity::getComponent(componentConstructor) -> Component`
#### `Entity::removeSelf() -> this`
Removes itself from its world.
#### `Entity::has_all(componentConstructors) -> boolean`
Returns whether it has all of the components.

`componentConstructors` is the array of component constructors to check for.

### `class World::System`
#### `System::constructor() -> this`
#### `System::update(data) -> undefined`
You usually won't call this yourself.
Instead, add the system to your world and call `world.update(data)` to update all of your systems.
