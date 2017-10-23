// Dependencies Declarations
const express = require('express');
const router = express.Router();

const monk = require('monk'); 
const db = monk('localhost:27017/movie-analyst');



// ================================================================================================
// ============= Routes Below This Line =========================================================== 
// ================================================================================================

// Implement the movies API endpoint
router.get('/movies', function (req, res) {
    // Get a list of movies and their review scores
    const movieCollection = db.get('movies');
    movieCollection.find({})
      .then(function(movies) {
          // Send the response as a JSON array
         res.json(movies);      
       });
 });

// Implement the Reviewers API endpoint
router.get('/reviewers', function (req, res) {
    // Get a list of all the reviewers
    const authorsCollection = db.get('authors');
    authorsCollection.find({})
      .then(function(authors) {
          // Send the response as a JSON array
         res.json(authors);      
       });
 });


// Implement the publications API endpoint
router.get('/publications', function (req, res) {
    // Get a list of publications
    const publicationsCollection = db.get('publications');
    publicationsCollection.find({})
      .then(function(publications) {
          // Send the response as a JSON array
         res.json(publications);      
       });
 });


// Implement the pending reviews API endpoint
router.get('/pending', function (req, res) {
    // Get a list of pending movie reviews
    const pendingCollection = db.get('pending');
    pendingCollection.find({})
      .then(function(pending) {
          // Send the response as a JSON array
         res.json(pending);      
       });
});

module.exports = router;