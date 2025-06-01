/* This controller handles all the routing function for main.js*/

'use strict'

const express = require('express')
const router = express.Router();

let users = [
  {
    name: "Jhon Wayne",
    gender: "male"
    },
    {
    name: "Mary Monro",
    gender: "female"
    },
    {
    name: "Charles Bronson",
    gender: "male"
    }
];

// This will route to the home page
router.get('/', function(req, res, next){
  res.render('index', { title: 'Home'});
});

// Function to handle '/users' to show the list of users
router.showUsers = (req, res) => {
  res.render('users', { users: users, title: "List of Users" });
};

// Function to handle '/users/submit' to submit the form data
router.addUser = (req, res) => {
  const { name, gender } = req.body;
  users.push({ name, gender });
  console.log(`In homeController addUser`);
  console.log(`name ${name}`);
  res.render('users', { users: users, title: "List of Users"});
};

// Function to handle '/contact' shows the post sign up form page
router.postSignUpForm = (req, res) => {
  console.log("in homeController postSignUpForm method");
  res.render("contact", {title: "Contact Us"});
};

router.deleteUser = (req, res) => {
  console.log("in homeController deleteUser");
  res.render("deleteUser", {title: "Delete User"});
};

router.postDeleteuser = (req, res) => {
  console.log('post delete user');
  const nameToDelete = req.body.name;

  const index = users.findIndex(user => user.name === nameToDelete);

  console.log(`Deleting user: ${nameToDelete}` );
    if (index !== -1) {
        // Remove the user from the array
        users.splice(index, 1);
        console.log(`User Deleted Successfully`);
        res.redirect('/users');
    } else {
        res.render('userNotFound', {title: 'User Not Found'});
    }
};


  module.exports = router;