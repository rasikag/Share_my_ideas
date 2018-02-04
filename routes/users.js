const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load user model
require('../models/User');
const User = mongoose.model('users');

// User login route
router.get('/login',(req, res) => {
    res.render('users/login');
});

// Login form post
router.post('/login', (req , res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
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

        User.findOne({ email : req.body.email})
            .then( user => {
                if(user){
                    req.flash('error_msg', 'email already registered');
                    res.redirect('/users/login');
                } else {
                    const newUser = new User({
                        name : req.body.name,
                        email : req.body.email,
                        password : req.body.email
                    });
            
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password , salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 
                                    'You are successfully registered to the system');
                                    res.redirect('/users/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                    return;
                                });
                        });
                    });
                }
            });
    }
    
});

module.exports = router;