const express =require('express');
const router = express.Router();
const { login, signup, refreshToken, logout, getAllUsers, createUserByAdmin } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post("/login",login);
router.post("/signup",signup);
router.post("/logout",logout);
router.get("/refresh",refreshToken);
router.get("/users",authMiddleware,getAllUsers);
router.post("/adduser",authMiddleware,createUserByAdmin);

module.exports = router;

