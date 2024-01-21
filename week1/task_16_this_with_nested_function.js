function Car(brand) {
  const obj = {
    brand,
    carInfo: "modelY",
    displayInfo(x) {
      console.log(`This is car of ${this.brand} and its info is ${x}.`);
    },
  };

  return obj;
}

const carObj = new Car("X");
carObj.displayInfo("info");
