const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')

router.post('/',ProductController.create)
router.put('/updateProductById/:id',ProductController.updateProductById)
router.delete("/destroyProductById/:id", ProductController.destroyProductById)
router.get('/getAll', ProductController.getAll)
router.get('/getProductById/:id',ProductController.getProductById)
router.get('/getOneProductByName/:name', ProductController.getOneProductByName)
router.get('/getProductByPrice/:price', ProductController.getProductByPrice)
//router.get('/selectDesc', ProductController.selectDesc)

module.exports = router;