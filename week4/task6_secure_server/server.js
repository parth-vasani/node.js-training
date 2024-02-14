const express=require('express');
let helmet=require('helmet');


const app=express();

app.use(helmet());

app.get('/',(req,res)=>{
    res.json("OK");
    console.log(res.header());
})


app.listen(8000,()=>{
    console.log("Running on port 8000");
})