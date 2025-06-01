const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require( 'body-parser' );
const layouts = require( 'express-ejs-layouts' );

app.set('view engine', 'ejs');

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(layouts);
app.use(express.json());
app.use(bodyParser.json());


app.get( '/', function( req, res )  {
  res.render( 'index' );
} );


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
