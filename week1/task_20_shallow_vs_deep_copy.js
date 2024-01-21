const originalPerson = {
  name: "Parth",
  age: 20,
  hobbies: ["x", "y", "z"],
};

const shallowCopyPerson = originalPerson;

const deepCopyPerson1 = { ...originalPerson };
const deepCopyPerson2 = structuredClone(originalPerson);

deepCopyPerson1.name = "Abc";
deepCopyPerson2.name = "Xyz";

console.log(deepCopyPerson1);
console.log(deepCopyPerson2);
console.log(originalPerson);
