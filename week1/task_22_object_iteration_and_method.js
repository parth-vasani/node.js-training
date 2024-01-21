const student = {
  name: "Parth",
  age: 20,
  grades: [7, 6, 8, 7, 9],
  calculateAverage() {
    let s = 0;
    for (const grade of this.grades) {
      s += grade;
    }

    return s / this.grades.length;
  },
};

console.log(student);

for (const key in student) {
  console.log(key, student[key]);
}
console.log("");

const keys = Object.keys(student);
keys.forEach((key) => {
  console.log(key, student[key]);
});
console.log("");

console.log("Average grade :", student.calculateAverage());
