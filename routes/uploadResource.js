var express = require('express');
var router = express.Router();
var multer = require('multer'); // Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files in Node.js applications.
var path = require("path"); 

/* GET home page. */
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/images/productImages');
    },
    // byDefault multer removes file extentions so let's add them back
    filename: function(req, file, callback) {
        file_path = "userImage" + '-' + Date.now() + path.extname(file.originalname);
        callback(null, file_path);
    }
}); 
router.post('/', function(req, res, next) {
    var responseData = {};
    var upload = multer({ storage: storage}).single("prodImage");
    upload(req, res, function(err) {
        if(err) {
            responseData.msg = "Error"
            console.log(err);
        }else {
            responseData.file_path = '/images/productImages/' + file_path;
            responseData.msg = 'Uploaded';
        }
        res.send(JSON.stringify(responseData));
    });
});
 
module.exports = router;
