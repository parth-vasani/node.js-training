const ar = [4, 5, 1, 3, 2, 23, 26, 2, 9, 0];

const s = ar.reduce((acc, x) => acc + x, 0);

console.log(s); // sum of all elements in ar

// const x = [];
// console.log(x.reduce((acc, i) => acc + i)); // TypeError
