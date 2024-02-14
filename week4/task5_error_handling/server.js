const express = require("express");
const jwt = require("jsonwebtoken");

const { router:booksRouter } = require("./routes/books");
const {router:usersRouter}=require("./routes/users");
const { handleAllErros } = require("./middlewares/error");

const JWT_SECRET_KEY = "secret-key";

let {books} = require('./booksData');
let {users} = require('./usersData');
const { authUser } = require("./middlewares/users");


const app = express();

app.use(express.json());
app.use("/books",authUser);

// routes
app.use('/books',booksRouter)
app.use('/users',usersRouter);
//


app.use('/',(req,res,next)=>{
  throw new Error("Invaid route.")
})

app.use(handleAllErros);


app.listen(8000, () => {
  console.log("App running on port 8000");
});
