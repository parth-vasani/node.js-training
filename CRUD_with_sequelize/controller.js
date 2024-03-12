const { Student } = require("./sequelize")


const getAllStudents=async(req,res)=>{
    try{
        let data=await Student.findAll({});
        res.status(200).json({data});

    }catch(err){
        throw err;
    }
}

const getAStudent=async(req,res)=>{
    try{
        let data=await Student.findOne({where:{id:req.params.id}});
        if(!data){
            res.status(404).json({status:404,msg:"Student not found."})
            return;
        }

        res.status(200).json({status:200,data:[data]});

    }catch(err){
        throw err;
    }

}

const addStudent=async(req,res)=>{
    let {firstname,lastname,age}=req.body;
    if(!firstname || !lastname || !age){
        throw new Error('Missing some attributes.')
    }

    try{
        let result=await Student.create({
            firstname,
            lastname,
            age,
        });

        res.status(201).json({status:201,msg:'Added.',data:result})

    }catch(err){
        throw err;
    }

}

const updateStudent=async(req,res)=>{
    let id=req.params.id;
    let {firstname,lastname,age}=req.body;

    let updatedData={};
    if(firstname){
        updatedData['firstname']=firstname;
    }
    if(lastname){
        updatedData['lastname']=lastname;
    }
    if(age){
        updatedData['age']=age;
    }


    try{
        let [updateCount,[updatedStudent]]=await Student.update(updatedData,{
            where:{
                id:req.params.id,
            },
            returning:true,
        });


        if(updateCount===0){
            res.status(404).json({status:404,msg:"Student not found."})
            return;
        }

        res.status(200).json({status:200,msg:"Updated.",data:updatedStudent});
    }
    catch(err){
        throw err;
    }

}


const deleteStudent=async(req,res)=>{
    try{
        let deleteCount=await Student.destroy({where:{
            id:req.params.id,
        }});

        if(deleteCount===0){
            res.status(404).json({status:404,msg:"Student not found."})
            return;
        }

        res.status(200).json({status:200,msg:"Deleted."});
    }catch(err){
        throw err;
    }
}

module.exports={getAllStudents,getAStudent,addStudent,updateStudent,deleteStudent};