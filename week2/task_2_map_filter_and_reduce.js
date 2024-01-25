const students = [
  { name: "jeel", age: 21 },
  { name: "franklin", age: 25 },
  { name: "vivek", age: 26 },
  { name: "hardik", age: 23 },
];

const studentsWithAgeMoreThan18 = students.filter((student) => student.age > 18).map((student) => student.name);

console.log(studentsWithAgeMoreThan18);
