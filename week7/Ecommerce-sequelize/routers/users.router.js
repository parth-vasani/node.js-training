const express = require('express');
const { getAllUsers, getAUser, addUsers, updateUsers, deleteUsers } = require('../controllers/users.controllers');
const { handleAllErrors } = require('../middlerwares/handleAllErrors');
const { authenticateUser } = require('../middlerwares/authenticateUser');

const router = express.Router();

router.use(authenticateUser);

router.get('/',getAllUsers);
router.get('/:email',getAUser);
router.post('/',addUsers);
router.put('/:email',updateUsers);
router.delete('/:email',deleteUsers);


// router.use(handleAllErrors)


module.exports={router};