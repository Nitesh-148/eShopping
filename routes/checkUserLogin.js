var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var responseData = {
        isUserLoggedIn: req.session.isUserLoggedIn
    }
    res.send(JSON.stringify(responseData));
});

module.exports = router;
