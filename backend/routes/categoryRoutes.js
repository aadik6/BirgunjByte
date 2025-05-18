const expres = require("express");
const router = expres.Router();
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createCategory);
router.get("/getAll", getAllCategories);
router.patch("/update/:id", authMiddleware, updateCategory);
router.delete("/delete/:id", authMiddleware, deleteCategory);

module.exports = router;
