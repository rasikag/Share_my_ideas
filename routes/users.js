const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User login route
router.get('/login',(req, res) => {
    res.render('users/login');
});

// User register route 
router.get('/register',(req, res)=>{
    res.render('users/register');
});

router.post('/register' , (req,res)=>{
    console.log(req.body);

    let errors = [];
    if(req.body.password != req.body.confirmPassword){
        errors.push({ text : 'Password do not match'});
    }
    if(req.body.password.length < 4 ){
        errors.push({ text : 'Password length should be  more that 4 chars'});
    }
    if(errors.length > 0){
        res.render('users/register', {
            errors : errors,
            name : req.body.name,
            email : req.body.email
        });
    } else {
        res.send('pass');
    }
    
});

module.exports = router;