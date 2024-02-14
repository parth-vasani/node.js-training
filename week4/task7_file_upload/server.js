const expres=require('express');
const multer=require('multer');
const path=require('path')


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__dirname+'/uploads/')
    },
    filename:(req,file,cb)=>{
        console.log("FILEFILE",file)
        cb(null,path.basename(file.originalname)+"-"+Date.now()+path.extname(file.originalname));
    }
})

// const upload=multer({dest:__dirname+'/upload/'})
const upload=multer({storage:storage});


const app=expres();

app.post('/',upload.array('file'),(req,res)=>{
    console.log("OK")
    console.log(req.body)
    console.log(req.file,req.files)
    res.json("OK")
})


app.listen(8000,()=>{
    console.log("App running on 8000");
})