const express = require('express');
const url = require('url');
const path = require('path');
const fs = require('fs');
const port = 3333;

const app = express();



app.get('/', (req, res) => {
    res.sendFile(path.resolve("../site/index.html"));
});

app.get('/authbykey/:key/:ip', (req, res) => {
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

app.get('/shelterPlus-extension/:key/:ip', (req, res) => {
    try {
        fs.readFile(`../../shelterKeys/${req.params.key}.json`, 'utf8', (err, jsonString) => {
            try {
                var keyData = JSON.parse(jsonString);
                res.send("OK");
            } catch (err) {
                res.send('No key');
            }
        });
    } catch (err) {
        res.send("Error");
    }
});

app.get('/activekey.php', (req, res) => {
    var keyReq = req.query.key;
    try {
        fs.readFile(`../../keys/${keyReq}.json`, 'utf8', (err2, jsonString) => {
            try {
                var keyData = JSON.parse(jsonString);
                res.send("OK");
            } catch (err1) {
                res.send('No key');
            }
        });
    } catch (err) {
        res.send("Error");
    }
});

app.get('/getUserIP', (req, res) => {
    var ip = req.ip;
    res.send(ip);
});

/*
app.get('/admin', (req, res) => {
    res.sendFile(path.resolve("./site/admin.html"));
});
*/

app.listen(port, () => {
    console.log(`Index page listening at http://localhost:${port}`)
    console.log(`Admin panel listening at http://localhost:${port}/admin.html`)
});

/*
app.use('/admin', '../site/admin');
app.get('/admin', (req, res) => {
    res.send('../site/admin.html')
});
*/
