/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

*/

const calcAverageHumanAge = ages => {
  // convert to human age
  const humanAges = ages.map(dogAge =>
    dogAge > 2 ? 16 + dogAge * 4 : 2 * dogAge
  );

  // remove below 18
  const adultDogs = humanAges.filter(humanAge => humanAge >= 18);

  // calculate average
  const averageHumanAge = adultDogs.reduce(
    (acc, age) => acc + age / adultDogs.length,
    0
  );

  console.log(averageHumanAge);
};

// Alternate solution: function chaining
const calcAverageHumanAge1 = ages => {
  const averageHumanAge = ages
    .map(dogAge => (dogAge > 2 ? 16 + dogAge * 4 : 2 * dogAge))
    .filter(humanAge => humanAge >= 18)
    .reduce((sum, age, _, adultDogs) => sum + age / adultDogs.length, 0);

  console.log(averageHumanAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

calcAverageHumanAge1([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge1([16, 6, 10, 5, 6, 1, 4]);

// reduce() only
const { sum, count } = [5, 2, 4, 1, 15, 8, 3].reduce(
  ({ sum, count }, age) => {
    if (age > 2) {
      const humanAge = 16 + age * 4;
      return humanAge >= 18
        ? { sum: sum + humanAge, count: count + 1 }
        : { sum, count };
    }

    return { sum, count };
  },
  { sum: 0, count: 0 }
);
console.log(sum, count);
console.log(`Human age average: ${sum / count}`);
