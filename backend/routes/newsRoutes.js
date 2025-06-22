const express = require("express");
const {
  getAllNews,
  createNews,
  getNewsById,
  getNewsByCategory,
  updateNews,
  deleteNews,
  getFeaturedNews,
  mostViewedNews,
} = require("../controllers/newsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/create", authMiddleware, createNews);
router.get("/get", getAllNews);
router.get("/get/:id", getNewsById);
router.get("/featured",getFeaturedNews);
router.get("/mostviewed", mostViewedNews);
router.get("/category/:categoryId", getNewsByCategory);
router.patch("/update/:id", authMiddleware, updateNews);
router.delete("/delete/:id", authMiddleware, deleteNews);

module.exports = router;