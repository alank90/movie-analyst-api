// Dependencies Declarations
var express = require('express');
var router = express.Router();

const monk = require('monk'); 
const db = monk('localhost:27017/movie-analyst');

router.get('/', function(req, res, next) { // run for any & all requests
   // Implement the Reviewers API endpoint
  const authorsCollection = db.get('authors');
  authorsCollection.find({})
    .then(function(authors) {
        // Send the response as a JSON array
       res.json(authors);      
     });
  
});

module.exports = router;