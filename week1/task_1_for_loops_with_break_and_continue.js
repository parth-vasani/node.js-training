/* eslint-disable quotes */
/* eslint-disable no-continue */
/* eslint-disable no-console */


const ar = [2, 4, 2, 1, 3, 4, 6, 5, 1, 9];
console.log("Before :");
for (let i = 0; i < ar.length; i++) {
  console.log(ar[i]);
}

console.log("\nAfter :");
for (let i = 0; i < ar.length; i++) {
  if (ar[i] == 3) {
    continue;
  } else if (ar[i] > 5) {
    break;
  }

  console.log(ar[i]);
}
