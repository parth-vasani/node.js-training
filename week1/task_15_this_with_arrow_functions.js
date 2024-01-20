const calculator = {
  x: 3,
  y: 9,
  calculate(operation) {
    const fn = () => {
      if (operation === "add") return this.x + this.y;
      if (operation === "subtract") return this.x - this.y;
      if (operation === "multiply") return this.x * this.y;
      if (operation === "divide") return this.x / this.y;
    };

    return fn();
  },
};

const ans = calculator.calculate("add");
console.log(ans);

console.log(calculator.calculate("subtract"));
console.log(calculator.calculate("multiply"));
console.log(calculator.calculate("divide"));
