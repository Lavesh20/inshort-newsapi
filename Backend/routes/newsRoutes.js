const express = require("express");
const { addNews, getNewsByCategory, updateNews, deleteNews, getAllNews } = require("../controllers/newsController");
const adminAuth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Important: specific routes must come BEFORE dynamic routes with parameters
router.get("/all", getAllNews); // Get all news without category filter
router.post("/add", upload.single("photo"), addNews); // Add news with image
router.get("/:category", getNewsByCategory); // Get news by category
router.put("/:id", adminAuth, upload.single("photo"), updateNews); // Update news (optional image)
router.delete("/:id", adminAuth, deleteNews); // Delete news (removes image too)

module.exports = router;