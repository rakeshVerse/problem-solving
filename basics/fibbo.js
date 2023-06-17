/**
 * Write a program to find the nth digit of the Fibonacci sequence.
 *
 * The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21
 *
 * Given the first term, F0 and second term, F1 as '0' and '1' respectively, 
 * the third term here can be given as, F2 = 0 + 1 = 1
 * Similarly,
    F3 = 1 + 1 = 2
    F4 = 2 + 1 = 3
    F5 = 2 + 3 = 5
    F6 = 3 + 5 = 8
    F7 = 5 + 8 = 13
    and so on

    F(n) = 0 1 F(2) = F(0)+F(1) F(3) = F(1)+F(2)... 
 */

const fibbo = (n) => {
  let prev = 0;
  let temp = 1;

  console.log(`${prev} ${temp}`);

  let nextTerm = 0;
  for (let i = 2; i <= n; i++) {
    nextTerm = prev + temp;
    console.log(` ${nextTerm}`);
    prev = temp;
    temp = nextTerm;
  }
};

// fibbo(3);
// fibbo(5);
fibbo(9);
