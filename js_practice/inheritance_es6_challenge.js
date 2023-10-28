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

const audi = new CarCl('Audi', 120);
audi.accelerate();
audi.brake();

console.log(CarCl.prototype);
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

console.log(EVCl.prototype);
console.log(EVCl.prototype.__proto__);

console.log(`---------------------`);

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate();
rivian.brake();
rivian.chargeBattery(90);
rivian.accelerate();

console.log(`---------------------`);

const tesla = new EVCl('Tesla', 100, 50)
  .accelerate()
  .brake()
  .chargeBattery(80)
  .accelerate();
console.log(tesla);
console.log(tesla.__proto__);
console.log(tesla.__proto__.__proto__);
