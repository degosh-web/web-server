const fs = require("fs");

fs.readdir("./keys/", function (err, files) {
    files.forEach(function (file) {
        console.log(file);
    });
});