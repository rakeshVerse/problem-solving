/**
 * Implement a program to swap the values of two variables without using a temporary variable.
 */

const swapValues = (x, y) => {
  console.log(`i/p: x: ${x}, y: ${y}`);
  x = x + y;
  y = x - y;
  x = x - y;

  console.log(`o/p: x: ${x}, y: ${y}`);
};

swapValues(8, 10);
