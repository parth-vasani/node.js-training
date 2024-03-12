const express = require("express");
const { connectToDB } = require("./sequelize");
const {router:studentRouter} = require("./router");


connectToDB();


const app = express();
app.use(express.json());
app.use((err,req,res,next)=>{
  res.status(err.status||500).json({status:err.status||500,msg:err.message||'Internal server error'})
})

app.use('/students',studentRouter);

app.use('/',(req,res)=>{
  throw new Error("Invaid route")
})



app.listen(8000, async() => {
  console.log("App running on 8000");
});

