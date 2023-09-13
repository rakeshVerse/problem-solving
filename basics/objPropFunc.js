/**
 * Assigning a function to an object property
 */
const calcAge = () => 2050 - 1989;

const obj = {
  firstName: 'John',
  age: calcAge(),
};

console.log(obj.age);
