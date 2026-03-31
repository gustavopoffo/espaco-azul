const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const emailController = require('../controllers/emailController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure conforme necessário

// Rota para login
router.post('/login', authController.login);

// Rota para email
router.post('/send-resume', upload.single('resume'), emailController.sendResume);
router.post('/send-message', emailController.sendMessage);

module.exports = router;