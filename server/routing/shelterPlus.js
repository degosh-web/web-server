const shelterRouter = require('express').Router();

shelterRouter.get('/shelterPlus-extension/:key/:ip', (req, res) => {
    try {
        fs.readFile(`../../../shelter/keys/${req.params.key}.json`, 'utf8', (err, jsonString) => {
            try {
                var keyData = JSON.parse(jsonString);
                if (keyData.IP == req.params.ip) {
                    res.send("OK");
                } else if (keyData.IP == "") {
                    keyData.IP = req.params.ip;
                    keyData = JSON.stringify(keyData);
                    fs.writeFile(`../../../shelter/keys/${req.params.key}.json`, keyData, err => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    res.send("OK");
                }
            } catch (err) {
                res.send('No key');
            }
        });
    } catch (err) {
        console.log("Error");
    }
});

module.exports = shelterRouter;