const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require( 'body-parser' );
const layouts = require( 'express-ejs-layouts' );

// Routes
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');

app.set('view engine', 'ejs');

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(layouts);
app.use(express.json());
app.use(express.static('views'));
app.use(bodyParser.json());


app.get( '/', function( req, res )  {
  res.render( 'index' );
} );


app.get('/users', homeController.showUsers);
app.post('/users/submit', homeController.addUser);


app.get('/contact', homeController.postSignUpForm);

app.get('/users/deleteUser', homeController.deleteUser);
app.post('/users/deleteUser', homeController.postDeleteuser);

app.get('/users/editUser/:id', homeController.editUser);
app.post('/users/updateUser/:id', homeController.updateUser);


app.use( errorController.pageNotFound );
app.use( errorController.respondInternalError );

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
