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

/*
 * Put to Update pending movies.
 */
router.put('/updatepending/:id',function(req, res){
    const db = req.db;
   
    const pendingCollection = db.get("pending");
    const pendingMovieToUpdate = req.params.id;
    const pendingTitle = req.body.title;
    const pendingRelease = req.body.release;
    const pendingScore = req.body.score;
    const pendingReviewer = req.body.reviewer;
    const pendingPublication = req.body.publication;

     // Update Pending document from put info
    pendingCollection.update({'_id': pendingMovieToUpdate},
        {
            $set: {
              title: pendingTitle,
              release: pendingRelease,
              score: pendingScore,
              reviewer: pendingReviewer,
              publication: pendingPublication
            }
        },
        function(err)  {
        res.send((err === null) ? {msg: ''} : {msg: err});
    }); // pendingCollection .update

});       

module.exports = router;