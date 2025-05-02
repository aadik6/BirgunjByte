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

const router = express.Router();
router.post("/create", createNews);
router.get("/get", getAllNews);
router.get("/get/:id", getNewsById);
router.get("/featured",getFeaturedNews);
router.get("/mostviewed", mostViewedNews);
router.get("/category/:categoryId", getNewsByCategory);
router.patch("/update/:id", updateNews);
router.delete("/delete/:id", deleteNews);

module.exports = router;