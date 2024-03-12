const { Router } = require("express");
const { getAllStudents, getAStudent, addStudent, updateStudent, deleteStudent } = require("./controller");


const router=Router();

router.get('/',getAllStudents);
router.get('/:id',getAStudent);
router.post('/',addStudent);
router.put('/:id',updateStudent);
router.delete('/:id',deleteStudent);

router.use((err,req,res,next)=>{
    res.status(err.status||500).json({status:err.status||500,msg:err.message||'Internal server error'})
  })

module.exports={router}