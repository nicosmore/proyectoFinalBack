const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const sendMail = require('./ethereal');
const UsersApi = require('../api/users.api');
const ChatApi = require('../api/chat.api');

const apiUser = new UsersApi();
const apiChat = new ChatApi();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

// Passport Local Strategy

// sign up
passport.use('signup', new LocalStrategy({
  passReqToCallback: true
}, async (req, username, password, done) => {
  try {
    if (password !== req.body.confirm_password) {
      console.log("Confirm the password again");
      return done(null, false);
    }
    const userItem = {
      name: req.body.name, 
      lastname: req.body.lastname,
      phone: req.body.phone,             
      email: username,
      password: createHash(password),      
    };
    
    const user = await apiUser.createUser(userItem);
    await apiChat.createMessage(user.email);
    console.log("User registration successfull");
    sendMail.sendmail(user.email ,user.name);
    
    return done(null, user);
  }

  catch(error) {
    console.log("Error signing user up...");
    console.log(error);
    return done(error);
  }
}));

// sign in
passport.use('signin', new LocalStrategy( async (username, password, done) => {
  try {
    const user = await apiUser.getByEmail(username);
    console.log(user);
    if (!isValidPassword(user, password)) {
      console.log("Invalid user or password");
      return done(null, false);
    }
    return done(null, user);
  }
  catch(error) {
    console.log("Error signing in...");
    return done(error);
  }
}))

// Serialization
passport.serializeUser((user, done) => {
  console.log("Inside Serializer");
  done(null, user._id);
})

// Deserialization
passport.deserializeUser(async (id, done) => {
  console.log("Inside Deserializer");
  const user = await apiUser.getById(id);
  done(null, user);
});

module.exports = passport;