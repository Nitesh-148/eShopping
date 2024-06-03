var express = require('express');
var router = express.Router();
var router = express.Router(); //Router is predefined method.
const {MongoClient} = require('mongodb');
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
const bcrypt = require('bcrypt'); // to incrypt the sensitive information like password.
const saltRounds = 10;

async function getDbConnection(inputData) {
    await mongoClient.connect(); // using await because it can go to database until it it can get the connction to database otherwise it will through an error .
    var db = mongoClient.db("fashionClub"); // fashioClub is database name.
    var collection = db.collection('userLoginDetails');
    return collection.insertOne(inputData);
}

/* GET home page. */
router.post('/', function(req, res, next) {
  var userDetails = req.body;
  var responseData = {};
  bcrypt.hash(userDetails.accountpwd, saltRounds, function(err, hash) {  // bcrypt alogoritm to encrypt user account password.
    userDetails.accountpwd = hash;
    getDbConnection(userDetails).then((response) => {
      if(response.insertedId){
        responseData.msg = 'Data inserted successfully';
      }
      else{
        responseData.msg = 'Error';
      }
      res.send(JSON.stringify(responseData))
    }).catch((error) => {
  
    })
  
  });
});

module.exports = router;
  