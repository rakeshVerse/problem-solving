/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;

    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
    return this;
  }
}

const audi = new CarCl('Audi', 120); // -> Audi going at 120 km/h
audi.accelerate(); // -> Audi going at 130 km/h
audi.brake(); // -> Audi going at 125 km/h

console.log(CarCl.prototype); // -> {constructor: ƒ, accelerate: ƒ, brake: ƒ}
console.log(`---------------------`);

class EVCl extends CarCl {
  #charge;

  constructor(make, brake, charge) {
    super(make, brake);
    this.#charge = charge;

    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    --this.#charge;
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

console.log(EVCl.prototype); // -> CarCl {constructor: ƒ, chargeBattery: ƒ, accelerate: ƒ}
console.log(EVCl.prototype.__proto__); // -> {constructor: ƒ, accelerate: ƒ, brake: ƒ}

console.log(`---------------------`);

const rivian = new EVCl('Rivian', 120, 23); // -> Rivian going at 120 km/h Rivian going at 120 km/h, with a charge of 23%
rivian.accelerate(); // -> Rivian going at 140 km/h, with a charge of 22%
rivian.brake(); // -> Rivian going at 135 km/h
rivian.chargeBattery(90);
rivian.accelerate(); // -> Rivian going at 155 km/h, with a charge of 89%

console.log(`---------------------`);

const tesla = new EVCl('Tesla', 100, 50)
  .accelerate()
  .brake()
  .chargeBattery(80)
  .accelerate();
/** -> 
Tesla going at 100 km/h
Tesla going at 100 km/h, with a charge of 50%
Tesla going at 120 km/h, with a charge of 49%
Tesla going at 115 km/h
Tesla going at 135 km/h, with a charge of 79%
*/

console.log(tesla); // -> EVCl {#charge: 79, make: 'Tesla', speed: 135}
console.log(tesla.__proto__); // -> CarCl {constructor: ƒ, chargeBattery: ƒ, accelerate: ƒ}
console.log(tesla.__proto__.__proto__); // -> {constructor: ƒ, accelerate: ƒ, brake: ƒ}
