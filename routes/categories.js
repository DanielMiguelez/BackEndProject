const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController')


router.post('/',CategoryController.create)
router.put('/updateCategoryById/:id',CategoryController.updateCategory)
router.delete('/deleteCategoryById/:id',CategoryController.deleteCategory)
router.get('/getCategories', CategoryController.getCategoriesWithProducts)
router.get('/getOneCategoryByName/:name',CategoryController.getOneCategoryByName)
router.get('/getCategoryById/:id',CategoryController.getCategoryById)



module.exports = router;

