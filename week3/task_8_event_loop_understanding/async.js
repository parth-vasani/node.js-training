const fs = require("fs");

setTimeout(() => {
  console.log("Timeout 1");
});

setImmediate(() => {
  console.log("Immediate called");
});

fs.readFile("./file1.txt", (err, data) => {
  if (err) console.log(err);
  else console.log(data.toString());
});

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
}, 30);

console.log("FINISH");
