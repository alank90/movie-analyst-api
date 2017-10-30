// Dependencies Declarations
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

// body-parser allows express to go into request body and extract 
// the json data and exposes it thru req.body
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


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

 /*
 * Put to Update publications.
 */
router.put('/updatepublication/:id', function(req, res) {
    const db = req.db;

    const publicationCollection = db.get("publications");
    const publicationToUpdate = req.params.id; // Assign collection document id from url :id value
    const publicationName = req.body.name;
    const publicationAvatar = req.body.avatar;
    
    //  Update the Publisher mongo document from put parameters
    publicationCollection.update({'_id': publicationToUpdate},
        {
            $set: {
              name: publicationName,
              avatar: publicationAvatar
            }
        },
        function(err)  {
          res.send((err === null) ? {msg: ''} : {msg: err});
        }); // publication .update

}); // End router.put

 module.exports = router;