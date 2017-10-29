var dependencies =  '// Dependencies Declarations';
dependencies += "const bodyParser = require('body-parser'')";

dependencies += "// body-parser allows express to go into request body and extract";
dependencies += "// the json data and exposes it thru req.body";
dependencies += "router.use(bodyParser.json());";
dependencies += "router.use(bodyParser.urlencoded({ extended: false }));";

module.exports = dependencies;