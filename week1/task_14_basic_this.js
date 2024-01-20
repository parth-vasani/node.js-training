const person = {
  name: "Abc",
  age: 20,
  introduce() {
    console.log(`Hii, I am ${this.name} and am ${this.age} years old.`);
  },
};

// console.log(person);

person.introduce();
