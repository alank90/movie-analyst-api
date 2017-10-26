// Dependencies Declarations
var express = require('express');
var router = express.Router();

// Implement the /movies API endpoint
router.get('/', function(req, res) {
  // This includes monk into our router
  const db = req.db; 
   // Get a list of movies and their review scores
  const movieCollection = db.get('movies');
  movieCollection.find({})
    .then(function(movies) {
        // Send the response as a JSON array
       res.json(movies);      
     });
  
});

module.exports = router;