const fibbo = (n) => {
  // Base Case: n = 0 & n = 1
  if (n == 0) return 0;
  else if (n == 1) return 1;
  else return fibbo(n - 2) + fibbo(n - 1);
};

console.log(fibbo(3));
