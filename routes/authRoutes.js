const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test,signupUser,signinUser,getProfile} = require('../controllers/authController');

// Middlewares
router.use(
    cors({
        credentials: true,
        origin: 'https://mern-auth-temp.vercel.app'
    })
);

router.get('/',test)
router.post('/signup',signupUser)
router.post('/signin',signinUser)
router.get('/profile',getProfile)

module.exports = router;