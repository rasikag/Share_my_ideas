const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8081;

// Load routes 
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport config 
require('./config/passport')(passport);

// DB config 
const db = require('./config/database');

// map global warning 
mongoose.Promise = global.Promise; 

// connect to mongoose
mongoose.connect(db.mongoURI,{
  useMongoClient: true
})
  .then(()=>{
    console.log('MongoDB connected...');
  })
  .catch((err)=>{
    console.log(err);
  });

// handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'})
);
app.set('view engine', 'handlebars');

// body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// method override middleware
app.use(methodOverride('_method'));

// express session middleware 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// set global variables 
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Index route
app.get('/', (req, res)=>{
  // change res.send('INDEX');
  //res.render('index');
  var title = 'Hello Bro!';
  res.render('index',{
    title : title
  })
});

// About route
app.get('/about' , (req, res)=>{
  //res.send('');
  res.render('about');
});

// Use ideas files 
app.use('/ideas',ideas);
app.use('/users',users);

app.listen(port , () => {
  console.log(`Server start on port ${port}`);
});
