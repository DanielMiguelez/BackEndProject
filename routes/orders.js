const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController')

router.post('/',OrderController.create)

module.exports = router;