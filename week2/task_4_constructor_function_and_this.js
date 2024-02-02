function Car(name, brand, year) {
  this.name = name;
  this.brand = brand;
  this.year = year;

  this.displayInfo= function() {
    console.log(
      `This is ${this.name} car from ${this.brand} and manufactured in the year ${this.year}`
    );
  };
}

const c1 = new Car("modelY", "X", 2020);
c1.displayInfo();
