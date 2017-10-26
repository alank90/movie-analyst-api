// Dependencies Declarations
var express = require('express');
var router = express.Router();

// Implement the pending reviews API endpoint
router.get('/', function (req, res) {
     // This includes monk into our router
    const db = req.db; 
    // Get a list of pending movie reviews
    const pendingCollection = db.get('pending');
    pendingCollection.find({})
      .then(function(pending) {
          // Send the response as a JSON array
         res.json(pending);      
       });
});

module.exports = router;