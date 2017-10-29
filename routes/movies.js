// Dependencies Declarations
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

// body-parser allows express to go into request body and extract 
// the json data and exposes it thru req.body
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

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

/*
 * Put to Update movie.
 */
router.put('/updatemovie/:id', function(req, res) {
    const db = req.db;

    const movieCollection = db.get("movies");
    const movieToUpdate = req.params.id; // Assign collection document id from url :id value
    const movieTitle = req.body.title;
    const movieRelease = req.body.release;
    const movieScore = req.body.score;
    const movieReviewer = req.body.reviewer;
    const moviePublication = req.body.publication;

     // Update the movie document from PUT info
    movieCollection.update({'_id' : movieToUpdate}, 
        {
            $set: {
              title: movieTitle,
              release: movieRelease,
              score: movieScore,
              reviewer: movieReviewer,
              publication: moviePublication
            }
        },
        function(err)  {
            res.send((err === null) ? {msg: ''} : {msg: err});
        }); // movieCollection .update

});

module.exports = router;