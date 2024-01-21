const originalObject = {
  name: "Parth",
  age: 20,
};

const modifiedObject = originalObject;
modifiedObject.name = "Abc";

console.log(modifiedObject.name, originalObject.name); // Abc Abc

console.log("Modifide object :", modifiedObject);
console.log("Original object :", originalObject);
