// Given an array that contains birthyears, caluculate what will be their age in 2050

const years = [1991, 2004, 2006, 2023, 1980];

const calcAge = (birthYear) => 2050 - birthYear;

const ageIn2050 = [];

for (let i = 0; i < years.length; i++) {
  ageIn2050[i] = calcAge(years[i]);
  console.log(
    `Age of person born in ${years[i]}, in 2050 will be: ${calcAge(years[i])}`
  );
}

console.log(ageIn2050);
