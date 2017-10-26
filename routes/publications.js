// Dependencies Declarations
var express = require('express');
var router = express.Router();

// Implement the publications API endpoint
router.get('/', function (req, res) {
     // This includes monk into our router
    const db = req.db; 
    // Get a list of publications
    const publicationsCollection = db.get('publications');
    publicationsCollection.find({})
      .then(function(publications) {
          // Send the response as a JSON array
         res.json(publications);      
       });
 });

 module.exports = router;