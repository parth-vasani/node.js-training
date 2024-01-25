function multiply(a, b) {
  return a * b;
}

const user = {
  name: "",
  age: 30,
};

function multiplyBy(y) {
  return (x) => multiply(x, y);
}

const multiplyByTwoUsingClosure = multiplyBy(2);
const multiplyByTwoUsingBind = multiply.bind(user, 2);

const x = 5;

console.log(multiplyByTwoUsingClosure(x));
console.log(multiplyByTwoUsingBind(x));
