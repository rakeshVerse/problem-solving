/**
 * Write a program to calculate the area of a triangle given the lengths of its three sides.
 *
 * To find the area of a triangle with 3 sides, we use the Heron's formula,
 * which says if a, b, and c are the three sides of a triangle, then its area is,
 * Area = √[s(s-a)(s-b)(s-c)]
 * Here, "s" is the semi-perimeter of the triangle, i.e., s = (a + b + c)/2.
 *
 * Steps:
 *  
    Step 1: Find semi-perimeter (s) by using the formula s = (a+b+c)/2.
    Step 2: Compute the differences (s - a), (s - b), and (s - c).
    Step 3: Compute the square root of [s(s - a)(s - b)(s - c)].

Note: If height & breadth of triangle is given then Area A = (h* b)/2
 */

const areaOfTriangle = (a, b, c) => {
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
};

console.log(areaOfTriangle(3, 4, 5));
console.log(areaOfTriangle(3, 3, 3));
console.log(areaOfTriangle(8, 11, 13));
console.log(areaOfTriangle(4, 6, 8));
