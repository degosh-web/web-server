const MongoClient = require('mongodb').MongoClient;
const dbPath = "mongodb://localhost:27017/degosh";
const dbShelterPlusPath = "mongodb://localhost:27017/shelterPlus";

MongoClient.connect(dbPath, function (err, db) {
    if (err) throw err;
    var dbo = db.db("degosh");
    dbo.createCollection("users", function (err, res) {
        if (err) throw console.log('"\x1b[41m"', `Database already exists`);
        console.log('"\x1b[42m"', `"Degosh" database and "users" collection are ready!`);
        db.close();
    });
});

MongoClient.connect(dbShelterPlusPath, function (err, db) {
    if (err) throw err;
    var dbo = db.db("shelterPlus");
    dbo.createCollection("users", function (err, res) {
        if (err) throw console.log('"\x1b[41m"', `Database already exists`);
        console.log('"\x1b[42m"', `"Shelter plus" database and "users" collection are ready!`);
        db.close();
    });
});