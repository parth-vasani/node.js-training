// var a1

console.log(a1); // a1=undefined, because js will move all the declarations (not initialization) of var variable to the top of the declaration block or function.
// console.log(b1); // Gives ReferenceError as b1(let) is not hoisted.

// value of a1 before its declaration is undefind because js will only move declaration of var variables to the top of the block or function in which they are declared. (so value is not defined before its declaration)

var a1 = 3;
const b1 = 1;

console.log(a1, b1);

function f1() {
  // var a2; It can be assumed like this.

  console.log(a2); // works as same as in case of block. var declarations are moved to the top of the declaration function by js.
  //   console.log(b2); //ReferenceError as let variables are not hoisted by js.

  var a2 = 6;
  const b2 = 8;

  console.log(a2, b2);
}
f1();

{
  // behavior of var and let is same as in function or in global scope.
  console.log(a3);
  console.log(b3); // Results in ReferenceError as declaration of let is not hoisted.

  var a3 = 1;
  let b3 = 2;
  console.log(a3, b3);
}


// Hoisting of var and let variables and its behavior is same in case of function, block.