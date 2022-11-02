const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController')


router.post('/',CategoryController.create)
router.put('/updateCategoryById/:id',CategoryController.updateCategory)
router.delete('/deleteCategoryById/:id',CategoryController.deleteCategory)

module.exports = router;