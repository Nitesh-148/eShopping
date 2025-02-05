var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb');
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");

async function getDbConnection(inputData) {
    await mongoClient.connect(); // using await because it can go to database until it it can get the connction to database otherwise it will through an error .
    var db = mongoClient.db("fashionClub"); // fashioClub is database name.
    var collection = db.collection('productDetails');
    if (inputData && inputData.data)
    {
        return collection.find({category: inputData.data.categoryType}).toArray();
    }
    else{
        return collection.find({}).toArray();
    }
}
  
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query);
    var productData = [];
    getDbConnection(req.query).then((response) => {
        productData = response;
       res.send(JSON.stringify(productData));
}).catch((error) => {
    console.error(error);
});
});

module.exports = router;
