const express=require('express');
const { getAllProduct, getAProduct, addProducts, updateProducts, deleteProducts } = require('../controllers/products.controller');
const { authenticateUser } = require('../middlerwares/authenticateUser');
const { hasRole, isOwner } = require('../middlerwares/hasRole');

const router=express.Router();

router.use(authenticateUser);

router.get('/',getAllProduct);
router.get('/:id',getAProduct);
router.post('/',hasRole('Seller'),addProducts);
router.put('/:id',hasRole('Seller'),isOwner,updateProducts);
router.delete('/:id',hasRole('Seller'),isOwner,deleteProducts);

module.exports={router};