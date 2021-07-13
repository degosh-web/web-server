const MongoClient = require('mongodb').MongoClient;
const dbPath = "mongodb://admin:2QomK_bX@degosh.com:27017/";

MongoClient.connect(dbPath, function (err, db) {
    if (err) throw err;
    var dbo = db.db("degosh");
    dbo.createCollection("users", function (err, res) {
        if (err) throw console.log('"\x1b[41m"', `Database already exists`);
        console.log('"\x1b[42m"', `"Degosh" database and "users" collection are ready!`);
        db.close();
    });
});

MongoClient.connect(dbPath, function (err, db) {
    if (err) throw err;
    var dbo = db.db("shelterPlus");
    dbo.createCollection("users", function (err, res) {
        if (err) throw console.log('"\x1b[41m"', `Database already exists`);
        console.log('"\x1b[42m"', `"Shelter plus" database and "users" collection are ready!`);
        db.close();
    });
});