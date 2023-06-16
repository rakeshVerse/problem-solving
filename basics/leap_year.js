/**
 * Write a program to check if a given year is a leap year or not.
 *
 * Leap Year: Instead of 365 days, a leap year is 366 days long. The additional day is added as the 29th of February.
 *
 * A leap year is exactly divisible by 4 except for century years (years ending with 00).
 * The century year is a leap year only if it is perfectly divisible by 400.
 *
 * Steps:
 *  It must be divisible by 4 but not 100
 *  OR
 *  It must be divisible by 400
 */

const leapYear = (year) =>
  (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
    ? console.log(`leap year`)
    : console.log(`not a leap year`);

leapYear(2016);
leapYear(2013);
leapYear(1200);
leapYear(1500);
