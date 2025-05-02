const expres = require('express');
const router = expres.Router();
const { createCategory, getAllCategories, updateCategory,deleteCategory } = require('../controllers/categoryController');

router.post('/create',createCategory); 
router.get('/getAll', getAllCategories);
router.patch('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);

module.exports = router;
