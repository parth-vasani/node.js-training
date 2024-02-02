const fs = require("fs");

setTimeout(() => {
  console.log("Timeout 1");
});

setImmediate(() => {
  console.log("Immediate called");
});

const data = fs.readFileSync("./file1.txt");
console.log(data.toString());

new Promise((res, rej) => {
  setTimeout(() => {
    console.log("Timeout 4");
    res("Promise 1");
  }, 100);
}).then((data) => {
  console.log(data);
});

setTimeout(() => {
  console.log("Timeout 2");
}, 10);

console.log("FINISH");