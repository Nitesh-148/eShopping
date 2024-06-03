var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb');
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");

async function getDbConnection(productData) {
    await mongoClient.connect(); // using await because it can go to database until it it can get the connction to database otherwise it will through an error .
    var db = mongoClient.db("fashionClub"); // fashioClub is database name.
    var collection = db.collection('productDetails');
    return collection.insertOne(productData);
}

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body)
    var responseData = {};

    getDbConnection(req.body).then((response) => {
      if(response.insertedId)
      {
        responseData.msg = 'Added';
      }
      else{
        responseData.msg = 'Error';
      }
      res.send(JSON.stringify(responseData));
    })
});

module.exports = router;
