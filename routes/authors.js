// Dependencies Declarations
var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
   // This includes monk into our router
  const db = req.db;  
   // Implement the Reviewers API endpoint
  const authorsCollection = db.get('authors');
  authorsCollection.find({})
    .then(function(authors) {
        // Send the response as a JSON array
       res.json(authors);      
     });
  
});

module.exports = router;