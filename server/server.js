const express = require('express');
const url = require('url');
const path = require('path');
const fs = require('fs');
const port = 3333;

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.resolve("./site/index.html"));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.resolve("./site/admin.html"));
});

app.listen(port, () => {
    console.log(`Index page listening at http://localhost:${port}`)
    console.log(`Admin panel listening at http://localhost:${port}/admin.html`)
});

/*
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

app.use('/admin', '../site/admin');
app.get('/admin', (req, res) => {
    res.send('../site/admin.html')
});
*/
//app.use(express.static('../site'));

