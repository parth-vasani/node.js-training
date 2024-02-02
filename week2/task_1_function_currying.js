function multiply(a, b) {
  return a * b;
}


function multiplyBy(y) {
  return (x) => multiply(x, y);
}

const multiplyByTwoUsingClosure = multiplyBy(2);
const multiplyByTwoUsingBind = multiply.bind(null, 2);

const x = 5;

console.log(multiplyByTwoUsingClosure(x));
console.log(multiplyByTwoUsingBind(x));
