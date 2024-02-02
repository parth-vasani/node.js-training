const students = [
  { name: "jeel", age: 21 },
  { name: "franklin", age: 25 },
  { name: "vivek", age: 26 },
  { name: "hardik", age: 23 },
];

const studentsWithAgeMoreThan18 = students
  .filter((student) => student.age > 18)
  .map((student) => student.name);

console.log(studentsWithAgeMoreThan18);

const arr = [2, 4, 1, 6, 8];

const sum = arr.reduce((acc, x) => acc + x);

console.log(sum);
