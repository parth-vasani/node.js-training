const express=require('express');
const { getCartDetails, addToCart, removeFromCart } = require('../controllers/carts.controller');
const { authenticateUser } = require('../middlerwares/authenticateUser');
const { hasRole } = require('../middlerwares/hasRole');

const router=express.Router();

router.use(authenticateUser,hasRole('Buyer'));

router.get('/',getCartDetails);
router.post('/:id',addToCart);
router.delete('/:id',removeFromCart);


module.exports={router};