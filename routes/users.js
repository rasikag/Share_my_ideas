const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User login route
router.get('/login',(req, res) => {
    res.render('users/login');
});

router.get('/register',(req, res)=>{

});


module.exports = router;