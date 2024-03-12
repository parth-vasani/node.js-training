const express = require("express");
const { getAllOrders, placeOrders, getAOrder, cancleOrders } = require("../controllers/orders.controller");
const { authenticateUser } = require("../middlerwares/authenticateUser");
const { hasRole } = require("../middlerwares/hasRole");

const router = express.Router();

router.use(authenticateUser,hasRole('Buyer'));

router.get('/', getAllOrders);
router.get('/:id',getAOrder);
router.post('/',placeOrders);
router.delete('/:id',cancleOrders);

module.exports = { router };
