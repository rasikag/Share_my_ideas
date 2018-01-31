const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

const port = 8081;

// map global warning 
mongoose.Promise = global.Promise; 

// connect to mongoose
mongoose.connect('mongodb://localhost/vid-upload-app',{
  useMongoClient: true
})
  .then(()=>{
    console.log('MongoDB connected...');
  })
  .catch((err)=>{
    console.log(err);
  });

require('./models/Idea');
const Idea = mongoose.model('ideas');

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

// ideas index page 
app.get('/ideas',(req,res)=> {
  Idea.find({})
      .sort({date:'desc'})
      .then(ideas => {
          res.render('ideas/index',{
              ideas: ideas
          });
      });
});

// show idea form 
// here you can add a idea to application
app.get('/ideas/add', (req, res)=>{
  res.render('ideas/add');
});

// save the idea 
app.post('/ideas',(req,res)=>{
  let errors = [];
  if(!res.body.title){
      errors.push({text: 'Please add a title'});
  }
  if(!res.body.details){
      errors.push({text: 'Please add some details'});
  }
  if(errors.length > 0){
      res.render('ideas/add',{
          errors : errors,
          title : req.body.title,
          details : req.body.details
      });
  } else {
      const newUser = {
          title : req.body.title,
          details : req.body.details
      }
      new Idea(newUser)
          .save()
          .then(idea =>{
              res.redirect('/ideas');
          })
  }

});





app.listen(port , () => {
  console.log(`Server start on port ${port}`);
});
