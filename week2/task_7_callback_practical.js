function mapFunction(arr, fn) {
  const newArr = [];
  for (let i of arr) {
    newArr.push(fn(i));
  }

  return newArr;
}

const arr = [1, 2, 3, 4, 5];

const newArr = mapFunction(arr, (x) => x * 2);

console.log(arr)
console.log(newArr);
