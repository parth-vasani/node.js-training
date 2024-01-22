// function Car(brand) {
//   const obj = {
//     brand,
//     carInfo: "modelY",
//     displayInfo(x) {
//       console.log(`This is car of ${this.brand} and its info is ${x}.`);
//     },
//   };

//   return obj;
// }

// const carObj = new Car("X");
// carObj.displayInfo("info");

function Car(brand) {
  this.brand = brand;

  this.displayInfo = function (info) {
    this.carInfo = info;
    console.log(`This is car of ${brand} and its info : ${info}.`);
  };
}

const c1 = new Car("X");
c1.displayInfo("with v type combustion engine");
