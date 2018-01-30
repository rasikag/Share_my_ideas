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

// process idea form 
app.post('/ideas', (req, res)=>{
  res.send('ok');
});

// show idea form 
app.get('/ideas/add', (req, res)=>{
  res.render('ideas/add');
});



app.listen(port , () => {
  console.log(`Server start on port ${port}`);
});
