const express=require('express');
const { default: mongoose } = require('mongoose');
const { createClient } = require('redis');

async function connectMongoDB(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/test',{
            authSource:'admin',
            user:'adminUser',
            pass:'adminPass',
        });

        console.log("MongoDB connected.");
    }
    catch(err){
        console.log(err);
    }

}

let redisClient=undefined;
async function connectRedis(){
    try{
        redisClient= await createClient().on('error',err=>console.log("Redis client error : ",err)).connect();

        console.log("Redis connected.");
    }
    catch(err){
        console.log(err);
    }
}

(async ()=>{
    await connectMongoDB();
    await connectRedis();
})();


const Post= mongoose.model('Post',mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    }
},{timestamps:true}));

async function getCachedPost(req,res,next){
    let posts=await redisClient.get('posts') || '[]';
    console.log("PP",posts)
    posts=JSON.parse(posts);

    if(posts && posts.length){
        res.send(posts);
        return;
    }

    next();
}

const app=express();

app.get('/posts',getCachedPost,async (req,res)=>{
    let result=await Post.find({});
    console.log("FROM MONGO")

    await redisClient.set('posts',JSON.stringify(result),{
        EX:10,
    });

    res.json(result);
})


app.listen(8000,()=>{
    console.log('App running on 8000.');
})