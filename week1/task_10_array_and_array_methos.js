const ar = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

console.log(ar);

ar.push("End");
console.log(ar);

let x = ar.pop();
console.log(ar,x);

x = ar.shift();
console.log(ar, x);

ar.unshift("Monday");
console.log(ar);

console.log(ar.indexOf("Wednesday")); // 2
