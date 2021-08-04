const adminRouter = require('express').Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

adminRouter.get('/admin', (req, res) => {
    res.render('pages/admin');
});

adminRouter.post('/admin', urlencodedParser, (req, res) => {
    if ((req.body.login == "Dima" || req.body.login == "Gosha") && (req.body.password == "2QomK_bX")) {
        res.render('pages/adminAccess', { title: "Degosh admin" });
    } else {
        res.render('pages/admin', { title: "Degosh admin" });
    }
});

module.exports = adminRouter;