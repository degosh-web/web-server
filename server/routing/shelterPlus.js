const shelterRouter = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var databaseUrl = "mongodb://admin:2QomK_bX@degosh.com:27017/";

module.exports = shelterRouter;

shelterRouter.get('/shelterPlus-extension/generateKey/:disordID/', (req, res) => {
    var license;
    MongoClient.connect(databaseUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shelterPlus");
        license = generateKey();

        let query = { discordID: req.params.disordID };

        try {
            dbo.collection("users").findOne(query, function (err, result) {
                if (result) {
                    license = result.key;
                }
            });
        } catch {
            console.log(error);
        }

        setTimeout(function () {
            let profile = {
                discordID: req.params.disordID,
                key: license,
                IP: "",
            }

            dbo.collection("users").update(query, profile, { upsert: true });
            db.close();
            res.send(license);
        }, 500);
    });
});

shelterRouter.get('/shelterPlus-extension/resetIP/:disordID/', (req, res) => {
    MongoClient.connect(databaseUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shelterPlus");
        var change = ['', '', ''];
        var query = { discordID: req.params.disordID };

        dbo.collection("users").findOne(query, function (err, result) {
            if (result) {
                change[0] = result.discordID;
                change[1] = result.key;
                change[2] = "";
            }
        });

        setTimeout(function () {
            dbo.collection("users").update(query, { "discordID": change[0], "key": change[1], "IP": change[2] }, { upsert: true });
        }, 500)
        res.send("yes");
    });
});

shelterRouter.get('/shelterPlus-extension/removeKey/:disordID/', (req, res) => {
    MongoClient.connect(databaseUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shelterPlus");
        let query = { discordID: req.params.disordID };
        dbo.collection("users").deleteOne(query, function (err, obj) {
            if (err) throw err;
            db.close();
        });
    });
});

shelterRouter.get('/shelterPlus-extension/:key/', (req, res) => {
    MongoClient.connect(databaseUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db("shelterPlus");
        var query = { key: req.params.key };

        dbo.collection("users").findOne(query, function (err, result) {
            console.log(req.ip);
            if (result) {
                if (result.IP == req.ip) {
                    res.send("OK");
                } else if (result.IP == "") {
                    let profile = {
                        discordID: result.discordID,
                        key: result.key,
                        IP: req.ip
                    }

                    dbo.collection("users").update(query, profile, { upsert: true });

                    res.send("OK");
                } else {
                    res.send("Bad");
                }
            } else {
                res.send("No key");
            }
        });
    });
});

function generateKey() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var tokens = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        chars = 5,
        segments = 4,
        keyString = "";

    for (var i = 0; i < segments; i++) {
        var segment = "";

        for (var j = 0; j < chars; j++) {
            var k = getRandomInt(0, 35);
            segment += tokens[k];
        }

        keyString += segment;

        if (i < (segments - 1)) {
            keyString += "-";
        }
    }

    return keyString;
}