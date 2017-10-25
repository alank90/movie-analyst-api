// Dependencies Declarations
var express = require('express');
var router = express.Router();

const monk = require('monk'); 
const db = monk('localhost:27017/movie-analyst');

// Implement the pending reviews API endpoint
router.get('/', function (req, res) {
    // Get a list of pending movie reviews
    const pendingCollection = db.get('pending');
    pendingCollection.find({})
      .then(function(pending) {
          // Send the response as a JSON array
         res.json(pending);      
       });
});

module.exports = router;