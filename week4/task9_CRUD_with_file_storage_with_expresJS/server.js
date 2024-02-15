const express = require("express");
const {
  getAllUsers,
  getAUser,
  addUsers,
  updateUsers,
  deleteUsers,
} = require("./controllers");
const { handleAllErrors, readUserData } = require("./middlewares");


const app=express();

app.use(express.json());
app.use(readUserData);

app.get("/users", getAllUsers);
app.get("/users/:id", getAUser);
app.post("/users", addUsers);
app.put("/users/:id", updateUsers);
app.delete("/users/:id", deleteUsers);

app.use(handleAllErrors); 

app.listen(8000, () => {
  console.log("App running on 8000");
});
