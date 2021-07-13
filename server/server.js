const express = require('express');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const url = require('url');
const path = require('path');
const fs = require('fs');
const port = 3333;
const app = express();

const adminRouter = require("./routing/admin");
const shelterRouter = require("./routing/shelterPlus");
const extensionAuthRouter = require("./routing/extensionAuth");

app.set('views', path.resolve('../site/views'))
app.set('view engine', 'ejs')

app.use(express.static('../site/public'))
app.use('/', adminRouter);
app.use('/', shelterRouter);
app.use('/', extensionAuthRouter);

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/ip/', (req, res) => {
    res.send(req.ip);
});

app.listen(port, () => {
    console.log(`Index page listening at http://localhost:${port}`)
    console.log(`Admin panel listening at http://localhost:${port}/degoshAdminPanel`)
});