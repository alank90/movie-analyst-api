// Dependencies Declarations
const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // enhanced logger

// We need to use cors here because API is on different port then APP.
// See below we use cors package on our callbacks to send correct headers on the http OPTIONS response
router.use(cors());

// body-parser allows express to go into request body and extract 
// the json data and exposes it thru req.body
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// You can set morgan to log differently depending on your environment
if (router.get('env') == 'production') {
  router.use(morgan('common', { skip: function (req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
  router.use(morgan('dev'));
}

// =====================================================================
// ============== Implement the /movies API endpoints ==================
// =====================================================================

// ============== GET for movie route =================================
router.get('/', function (req, res) {
  // This includes monk into our router
  const db = req.db;
  // Get a list of movies and their review scores
  const movieCollection = db.get('movies');
  movieCollection.find({})
    .then(function (movies) {
      // Send the response as a JSON array
      res.json(movies);
    });

});

// ============ Add a Document Movie Route  w/CORS support =====================
router.post('/addmovie', function (req, res) {
  const db = req.db;

  const movieCollection = db.get("movies");
  const movieTitle = req.body.title;
  const movieRelease = req.body.release;
  const movieScore = req.body.score;
  const movieReviewer = req.body.reviewer;
  const moviePublication = req.body.publication;

  // Insert the Document from the POST info
  movieCollection.insert({
    title: movieTitle,
    release: movieRelease,
    score: movieScore,
    reviewer: movieReviewer,
    publication: moviePublication
  })
    .then(function () {
      movieCollection.find({ title: movieTitle }, { sort: { _id: -1 }, limit: 1 })
        .then(function (movie) {
          // Send the response as a JSON array
          res.json(movie);
        });
    })
    .catch((error) => { // If error occurs
      console.log(error);
    });
});  // end POST
// ================= End Route =============================================


// ============ Put to Update Document Movie Route w/CORS support ==========
router.put('/updatemovie/:id', function (req, res) {
  const db = req.db;

  const movieCollection = db.get("movies");
  const movieToUpdate = req.params.id; // Assign collection document id from url :id value
  const movieTitle = req.body.title;
  const movieRelease = req.body.release;
  const movieScore = req.body.score;
  const movieReviewer = req.body.reviewer;
  const moviePublication = req.body.publication;

  // Update the movie document from PUT info
  movieCollection.update({ '_id': movieToUpdate },
    {
      $set: {
        title: movieTitle,
        release: movieRelease,
        score: movieScore,
        reviewer: movieReviewer,
        publication: moviePublication
      }
    }) // movieCollection .update
    .then(function (movie) {
      movieCollection.find({ '_id': movieToUpdate })
        .then(function (movie) {    // .then uses what is returned from promise(the .find op) ie, movie
          // Send the response as a JSON array
          res.json(movie);
        })
        .catch((error) => { // If error occurs
          console.log(error);
        });
    })
    .catch((error) => { // If error occurs
      console.log(error);
    });

});
// ================= End Route =============================================

// ============ Delete Document Movie Route w/CORS support =================
router.delete('/deletemovie/:id', function (req, res) {
  const db = req.db;

  const movieCollection = db.get("movies");
  const movieToDelete = req.params.id; // Assign collection document id from url :id value

  movieCollection.remove({ '_id': movieToDelete })
    .then(function () {
      // Send Back the deleted movieID
      res.send(movieToDelete);
    })
    .catch((error) => { // If error occurs
      console.log(error);
    });

});
// ================= End Route =============================================


module.exports = router;