var a = 1;
const b = 2;
const c = 3;

console.log(a, b, c);

// always declare variables in js with let or const unless
// there is a specific need to declare variable using var.

// Variable declared using let and const are block or function scoped
// while var variables are global scoped.

{
  const a1 = 4;
  const b1 = 5;
  const c1 = 6;

  console.log(a1, b1, c1); // 4 5 6

  var a = 20; // this will redeclare the variable a which was already declared.
  const b = 30;

  console.log(a, b); // 20 30
}

console.log(a,b,c); // 20 2 3

// var variables are hoiested by js. all declaration of 'var' will be moved to top
// of function or blcok in which declared.

console.log(a2); // undefined
var a2 = 4;

// When variables which will not change throught the program execution, 
// should be declared as constant using const.
const pi = 3.14;
console.log(pi);

// pi = 3; // will throw TypeError


// primitive data typs like objects, arrays are referenced by variable. so, when value is changed in array or object, there referece will not change, value pointed by reference will change.
// So, in case of primitive data types, const can be used to declare.

const ar = [1, 2, 3, 4, 5];
ar.push(6);
console.log(ar);
