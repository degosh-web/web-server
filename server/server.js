const express = require('express');
const path = require('path');
const port = 3333;

const app = express();
const admin = express();

app.use(express.static('site'));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});