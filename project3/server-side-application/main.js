const express = require('express');
const app = express();
const port = 3000;
const layouts = require('express-ejs-layouts');

const User = require("./models/user");

// Routes
const apiRoute = require('./routes/apiRoutes');
const usersRoute = require('./routes/usersRoute');

//Error Handlers
const errorController = require('./controllers/errorController');

//Connection to mongoose
const methodOveride = require('method-override');
const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/usersdb';

mongoose.Promise = global.Promise;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initializeUsers();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

const db = mongoose.connection;

db.once('open', () => {
  console.log(`Successfully connected to MongoDB using Mongoose! `)
})

const defaultUsers = [
  { name: 'Mary', gender: 'female' },
  { name: 'Linda', gender: 'female' },
  { name: 'Fred', gender: 'male' },
  { name: 'Joe', gender: 'male' },
  { name: 'Jane', gender: 'female' },
  { name: 'Nick', gender: 'male' }
];

async function initializeUsers() {
  try {
    const users = await User.find();
    if (users.length === 0) {
      console.log("No users found in database. Adding default users.");
      await User.insertMany(defaultUsers);
      console.log("Default users were added successfully!");
    } else {
      console.log("Database already initialized with users.");
    }
  } catch (err) {
    console.error("Error accessing the database:", err);
  }
}


// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(layouts);
app.use(express.json());
app.use(express.static('views'));
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(methodOveride('_method', {
  methods: ['POST', 'GET']
}));

app.get('/', function (req, res) {
  res.render('index');
});

//Routes
app.use('/api', apiRoute);
app.use('/users', usersRoute);

//Handling error when page not found
app.use(errorController.pageNotFound);

//Handling InternalServerError
app.use(errorController.respondInternalError);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
