const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController')

router.post('/createOrder',OrderController.createOrder)
router.get('/getOrdersAndProducts',OrderController.getOrdersAndProducts)

module.exports = router;