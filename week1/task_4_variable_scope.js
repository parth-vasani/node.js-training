/* eslint-disable space-before-blocks */
/* eslint-disable no-console */
/* eslint-disable indent */

var a1 = 1;
let a2; // var has global scope, can be accessed from anywhere in a program.
a2 = 3;

const b1 = 3;
let b2; // let variable can be declared without initialization but cannot be redeclared.
b2 = 1;

console.log(a1);

var a1 = 1; // var can be re declared.
// It is not possible in case of let and const.

function f1() {
  a1 += 2;
  console.log(a1);
  console.log(b1);
}
f1();

// In Block...
{
  var a3 = 1;
  const b3 = 12; // cannot be accessed outside this block.

  console.log(b3, a3);
}

console.log(a3);
// console.log(b3); // As let is block scoped, cannot be accessed outside of its declaration block.

const c1 = 10; // const variable must be initialized while declaring.
// otherwise results in SyntaxError.

// c1 = 3; // const cannot be reassigned.

const user = {
  name: "ABC",
  age: 21,
};

// In case of const objects ::
console.log(user);

user.name = "XYZ";
console.log(user); // value of name changed becuase const user holds reference to the object.
// as the reference is not changed but the value which is pointed the reference has been changed.



// a1,b1,c1
function f2() {
  console.log(a1,a2);  // a1=undefined due to hoisting of var 

  var a1 = 30;
  const b1 = 20;
  const c1 = 0;

  console.log(a1, b1, c1);
}
f2();




// var is global scope variable and can be redeclared.
// let is block and functional scoped variable and cannot be redeclared.
// const is block scoped variable and must be initialized while declaring.
