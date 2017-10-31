// Dependencies Declarations
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');

// body-parser allows express to go into request body and extract 
// the json data and exposes it thru req.body
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


// You can set morgan to log differently depending on your environment
if (router.get('env') == 'production') {
  router.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
  router.use(morgan('dev'));
}

// Implement the/reviewers endpoint
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

/*
 * Put to Update reviewers.
 */
router.put('/updatereviewer/:id', function(req, res) {
   const db = req.db;

   const authorsCollection = db.get("authors");
   const reviewerToUpdate = req.params.id;
   const reviewerName = req.body.name;
   const reviewerPublication = req.body.publication;
   const reviewerAvatar = req.body.avatar;

   // Update the reviewer document from put info
   authorsCollection.update({'_id' : reviewerToUpdate},
      {
        $set: {
          name: reviewerName,
          publication: reviewerPublication,
          avatar: reviewerAvatar
        }
      },
      function(err)  {
        res.send((err === null) ? {msg: ''} : {msg: err});
    }); // authorsCollection .update
  
});

module.exports = router;