// function f() {
//   const name = "ABC";
//   const x = 2;

//   console.log("In function :", name, x);
// }
// f();

// console.log("Outside of function :", name, x);

function f1() {
  var a = 2;
  let b = 5;

  console.log(a, b); // print 2,5

  if (true) {
    var a = 20;
    let b = 50;

    let c = 1; // let variable is only accessible to this block only.

    console.log(a, b); // print 20,50
                       // variable b and c is only declared 
                      //  while var a is accesible throught its functional scope, it is redeclared and change the original value.
  }

  console.log(a, b);  // print 20,5

  console.log(c); // throws a ReferenceError as c is not declared in this scope.
}
f1();
