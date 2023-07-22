function checkPrime(n) {
  if (n == 1 || n == 0) return false;

  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}

function primeNumbers(num) {
  for (let i = 1; i <= num; i++) {
    if (!checkPrime(i)) {
      console.log(i);
    }
  }
};

primeNumbers(20);