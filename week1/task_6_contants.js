const c1 = 3;

console.log(c1);

// c1 = 4; // throws a TypeError as constants cannot be reassigned.
console.log(c1);

// constants in js are hard constant. That means ones reference to const is assigned then it cannot be changed.
// But it is possible to change the value pointed by the reference stored in const variable.
// In case of primitive (objects, arrays, etc), const stores the reference of primitive value not the value. Thus it is possible to change key value in const primitive data values.

const obj = {
  name: "ME",
};
console.log(obj); // {name:"ME"}

obj.age = 20;
console.log(obj); // {name:"ME",age:20}

// const can be used where,
// When there are variables which will not be changed throughout the program execution,
// or there is need of constant variable such that no one can change it.
// in case of primitive data types, we sure that we only changes the values referenced by objects not the original reference.
// so, const can be used for primitive data types.
