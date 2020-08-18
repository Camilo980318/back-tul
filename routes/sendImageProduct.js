var express = require('express');

var fileSystem = require('fs');
var path = require('path');

var app = express();


//===============================================================
//                     SEND IMAGE
//===============================================================

app.get('/:sku/:image', (req, res) => {

    var sku = req.params.sku;
    var image = req.params.image;

    var pathimage = path.resolve(__dirname, `../uploads/products/${sku}/${image}`);

    if (fileSystem.existsSync(pathimage)) {
        res.sendFile(pathimage);

    } else {
        var pathNoImage = path.resolve(__dirname, '../assets/img/no-img.jpg');
        res.sendFile(pathNoImage);
    }

});

module.exports = app;