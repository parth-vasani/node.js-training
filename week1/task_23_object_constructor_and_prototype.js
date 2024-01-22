function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet=function(){
  console.log(`Hello ${this.name}!`);
}

const p1 = new Person("Parth", 20);
const p2 = new Person("Abc", 22);


p1.greet();
p2.greet();
