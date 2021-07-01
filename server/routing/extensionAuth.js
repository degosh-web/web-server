const extensionAuthRouter = require('express').Router();
const path = require('path');
const fs = require('fs');
const url = require('url');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

extensionAuthRouter.get('/authbykey/:key/:ip', (req, res) => {
    try {
        fs.readdir("../../keys/", function (err1, files) {
            fs.readFile(`../../keys/${req.params.key}.json`, 'utf8', (err2, jsonString) => {
                try {
                    var keyData = JSON.parse(jsonString);
                    if (keyData.IP == req.params.ip) {
                        res.send("Hello, " + keyData.nickname);
                    } else {
                        res.send("Is it you?");
                    }
                } catch (err1) {
                    res.send('No key');
                }
            });
        });
    } catch (err) {
        res.send("Error");
    }
});

extensionAuthRouter.get('/activekey.php', (req, res) => {
    try {
        fs.readdir("../../keys/", function (err1, files) {
            fs.readFile(`../../keys/${req.query.key}.json`, 'utf8', (err, jsonString) => {
                try {
                    var keyData = JSON.parse(jsonString);
                    res.send("OK");
                } catch (err1) {
                    res.send('No key');
                }
            });
        });
    } catch (err) {
        res.send("Error");
    }
});

module.exports = extensionAuthRouter;