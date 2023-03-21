const express = require('express');
const passport = require('../../middlewares/passport');


const router = express.Router();

router.post('/register', passport.authenticate(
  'signup', { 
      failureRedirect: '/signup-error',
      successRedirect: '/api/home'
    })    
);

router.post('/login', passport.authenticate(
  'signin', {
    failureRedirect: '/signin-error',
    successRedirect: '/api/home'
  })
);

module.exports = router;