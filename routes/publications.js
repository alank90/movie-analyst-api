// Dependencies Declarations
var express = require('express');
var router = express.Router();

const monk = require('monk'); 
const db = monk('localhost:27017/movie-analyst');

// Implement the publications API endpoint
router.get('/', function (req, res) {
    // Get a list of publications
    const publicationsCollection = db.get('publications');
    publicationsCollection.find({})
      .then(function(publications) {
          // Send the response as a JSON array
         res.json(publications);      
       });
 });

 module.exports = router;