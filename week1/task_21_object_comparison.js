const user1 = {
  name: "Parth",
  age: 20,
};

const user2 = {
  name: "",
  age: 20,
};

function compareUser(user1, user2) {
  const keys = Object.keys(user1);

  for (key of keys) {
    if (user1[key] !== user2[key]) {
      return false;
    }
  }

  return true;
}

console.log(compareUser(user1, user2));
