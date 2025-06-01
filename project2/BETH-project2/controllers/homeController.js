/* This controller handles all the routing function for main.js*/

'use strict'

const express = require('express');
const User = require('../models/user');
const router = express.Router();
const { ObjectId } = require('mongodb');

const MongoDB = require("mongodb").MongoClient,
      dbURL="mongodb://localhost:27017",
      dbName="usersdb";

const collectionName = "contacts";
let col;

// Function to establish MongoDB connection
async function connectToMongoDB() {
  try {
    const client = await MongoDB.connect(dbURL, { useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4 });
    const db = client.db(dbName);
    col = db.collection(collectionName);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Call connectToMongoDB to establish the connection
connectToMongoDB();

// This will route to the home page
router.get('/', function(req, res, next){
  res.render('index', { title: 'Home'});
});

// Function to handle '/users' to show the list of users
router.showUsers = async (req, res) => {
  try {
    console.info("Inside show users");
    const users = await col.find({}).toArray();
    res.render('users', { users: users, title: "List of Users" });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle '/users/submit' to submit the form data
router.addUser = async (req, res) => {

  try{
    const { name, gender } = req.body;
    const user = new User(name, gender);

    // Add User record to MongoDB
    await col.insertOne(user);

    console.log(`In homeController addUser`);
    console.log(`name ${name}`);
    res.redirect('/users');
  } catch (error) {
    console.error('Error saving the data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
};

// Function to handle '/contact' shows the post sign up form page
router.postSignUpForm = (req, res) => {
  console.log("in homeController postSignUpForm method");
  res.render("contact", {title: "Contact Us"});
};

// Function to handle '/deleteUser' shows the delete Form page
router.deleteUser = (req, res) => {
  console.log("in homeController deleteUser");
  res.render("deleteUser", {title: "Delete User"});
};

// Function to handle '/users/deleteUser' dletes the User by Name
router.postDeleteuser = async (req, res) => {
  console.log('post delete user');
  const nameToDelete = req.body.name;

  try {
    const deleteUser = await col.deleteOne({ name: nameToDelete });  
    console.log(`Deleting user: ${nameToDelete}` );
      if (deleteUser.deletedCount > 0) {
          console.log(`User Deleted Successfully`);
          res.redirect('/users');
      } else {
          res.render('userNotFound', {title: 'User Not Found'});
      }
  } catch (error) {
    console.error('Error saving the data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to handle '/editUser' shows the edit Form page
router.editUser = async (req, res) => {
  console.log("in homeController editUser");
  try {
    const userId = req.params.id;
    const user = await col.findOne({ _id: new ObjectId(userId) });  
    res.render('editUser', { user: user });
  } catch (err) {
    console.error('Error rendering editUser page:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Function to handle '/updateUser' updates the userById
router.updateUser = async (req, res) => {
  try {
    console.info("Update User ");
    const userId = req.params.id;
    const { name, gender } = req.body;
    const result = await col.updateOne({ _id: new ObjectId(userId) }, { $set: { name, gender } });
    if (result.modifiedCount > 0) {
      console.log(`User updated successfully: ${userId}`);
      res.redirect('/users');
    } else {
      console.log(`User not found or no changes made: ${userId}`);
      res.render('userNotFound', { title: 'User Not Found or No Changes Made' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = router;