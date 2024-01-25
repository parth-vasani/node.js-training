function getSum(x, s = 0) {
  if (!getSum.arguments[0]) {
    return s;
  }

  return (y) => getSum(y, s + x);
}

console.log(getSum(2)(3)(4)(5)());
