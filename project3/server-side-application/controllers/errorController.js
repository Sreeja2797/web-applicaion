/* This controller handles all the errors*/

'use strict';

const httpStatus = require( 'http-status-codes' );

// Function used when a page not found error is occured
exports.pageNotFound = ( req, res ) => {
  let errorCode = httpStatus.StatusCodes.NOT_FOUND;
  res.status( errorCode );
  res.send(`${errorCode} | The Current Page Not Found!`);
};

// Function used when an Internal Server Error is occured
exports.respondInternalError = ( error, req, res, next ) => {
  let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
  console.log( `ERROR occurred: ${error.stack}` );
  res.status( errorCode );
  res.send( `${errorCode} | The server is down, Please visit again!` );
};
