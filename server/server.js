const express = require('express');
const url = require('url');
const path = require('path');
const port = 3333;

const app = express();
const admin = express();

app.get('/hello', (req, res) => {
    let urlRequest = url.parse(req.url, true);
    res.send(urlRequest.query.key);
});

app.use(express.static('site'));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});