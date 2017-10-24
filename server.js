// Get Our Dependencies
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Mongodb Dependencies
const mongo = require ('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/movie-analyst');

const jwt = require('express-jwt');
const rsaValidation = require('auth0-api-jwt-rsa-validation');

const routes = require('./routes/api');

// ===================================================================================================
// ============= Middlware Below This Line =========================================================== 
// ===================================================================================================

// jwtCheck middleware to validate the access token when our API is called.The JWT authentication 
// middleware authenticates callers using a JWT(JSON Web Token). If the token is valid, req.user 
// will be set with the JSON object decoded to be used by later middleware (in this instance guard()) 
// for authorization and access control.
// Note that the audience field is the identifier you gave to your API.
const jwtCheck = jwt({
    secret: rsaValidation(),
    algorithms: ['RS256'],
    issuer: "https://movieapi.auth0.com/",
    audience: 'movieanalyst'
});

const guard = function (req, res, next) {
        
    // we’ll use a case switch statement on the route requested
    switch (req.path) {
        // if the request is for movie reviews we’ll check to see if the token has general scope
        case '/movies': {
            const permissions = ['general'];
            for (var i = 0; i < permissions.length; i++) {
                if (req.user.scope.includes(permissions[i])) {
                    next();
                } else {
                    res.send(403, { message: 'Forbidden' });
                }

            }
            break;
        }
        // Same for reviewers
        case '/reviewers': {
            const permissions = ['general'];
            for (var i = 0; i < permissions.length; i++) {
                if (req.user.scope.includes(permissions[i])) {
                    next();
                } else {
                    res.send(403, { message: "Forbidden" });
                }
            }
            break;
        }
        // Same for publications
        case '/publications': {
            const permissions = ['general'];
            for (var i = 0; i < permissions.length; i++) {
                if (req.user.scope.includes(permissions[i])) {
                    next();
                } else {
                    res.send(403, { message: 'Forbidden' });
                }
            }
            break;
        }
        // For the pending route, we’ll check to make sure the token has the scope of admin before returning the results.
        case '/pending': {
            const permissions = ['admin'];
            console.log(req.user.scope);
            for (var i = 0; i < permissions.length; i++) {
                if (req.user.scope.includes(permissions[i])) {
                    next();
                } else {
                    res.status(403).send(body);
                }
            }
            break;
        }
    }
};

// Enable the use of the jwtCheck middleware in all of our routes
app.use(jwtCheck);
app.use(guard);

// Middleware to make the db accessible to the router
app.use(function(req, res, next){
    req.db = db;
    next();
});


// Middleware to use imported routes from /routes/
app.use('/', routes);

// If we do not get the correct credentials, we’ll return an appropriate message
// Note- This is error-handling middleware so it takes four arguments
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: 'Missing or invalid token' });
    }
});


// Launch the API Server and have it listen on port 8080
app.listen(8080, function () {
    console.log('Express Server Movie-Analyst API started. Listening on port 8080');
});
