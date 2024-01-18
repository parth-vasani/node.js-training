const ar = ["Apple", "Banana", "Orange", "Pineapple", "Guava"];

let i = 0;
while (i < ar.length) {
  if (ar[i].length > 8) {
    break;
  }

  ar[i].split("").forEach((c) => {
    console.log(c);
  });
  console.log("!\n");
  i++;
}

// :: Difference between while and foreach loop ::
// while loop will executes a block of code till a given condition is true.
// while foreach loop will call the given call back function for each of the defined elements in the Object.
// (in foreach loop, for undefined call back function will not be called.)
