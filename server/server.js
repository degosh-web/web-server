const express = require('express');
const url = require('url');
const path = require('path');
const fs = require('fs');
const port = 3333;

const app = express();
const admin = express();

app.get('/authByKey', (req, res) => {
    let urlRequest = url.parse(req.url, true);
    var key = urlRequest.query.key;

    fs.readFile(`../keys/${key}.json`, 'utf8', (err, jsonString) => {
        if (err) {
            res.send("The system can not find this key");
            return;
        } else {
            res.send("OK");
        }
    });    
});

app.use(express.static('../site'));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});