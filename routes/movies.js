// Dependencies Declarations
var express = require('express');
var router = express.Router();

const monk = require('monk'); 
const db = monk('localhost:27017/movie-analyst');


router.get('/', function(req, res) { 
   // Get a list of movies and their review scores
  const movieCollection = db.get('movies');
  movieCollection.find({})
    .then(function(movies) {
        // Send the response as a JSON array
       res.json(movies);      
     });
  
});

module.exports = router;