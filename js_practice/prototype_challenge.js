/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }

  get speedUS() {
    return `${this.make} going at ${this.speed / 1.6} mi/h`;
  }
}

const ford = new CarCl('Ford', 120);
// console.log(ford);
// console.log(ford.__proto__);
// console.log(ford.constructor);

ford.accelerate();
ford.brake();
ford.brake();
ford.accelerate();

ford.speedUS = 75; // mi/h
console.log(ford.speed);
console.log(ford.speedUS);
