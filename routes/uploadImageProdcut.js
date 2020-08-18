var express = require('express');
var app = express();

var fileUpload = require('express-fileupload');
var fileSystem = require('fs');
var Product = require('../models/Product');
var mdAuth = require('../middlewares/auth');

app.use(fileUpload());

//===============================================================
//                     UPLOAD IMAGE
//===============================================================
app.put('/:sku', mdAuth.verifyToken, (req, res) => {

    var sku = req.params.sku;
    var image = req.files.image;

    if (!image) {

        res.status(500).json({
            ok: false,
            message: "Lo sentimos, pero debe seleccionar una imagen",
        });

    } else {

        var imgToSave = setImageProduct(image, "imgPricipal", sku, res);

        Product.findOneAndUpdate({ sku: sku }, { image: imgToSave }, (err, productAct) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: "Lo sentimos, hubo un error al almacenar la imagen",
                    error: err
                });
            } else {
                res.status(200).json({
                    ok: true,
                    product: productAct
                });
            }
        });
    }

});



//===============================================================
//                   MOVE IMAGE TO SERVER
//===============================================================
function setImageProduct(image, imageType, sku, res) {

    var cutName = image.name.split('.');
    var extensionImage = cutName[cutName.length - 1];

    // Hacemos una lista de las extensiones permitidas
    var extensions = ['png', 'jpg', 'jpeg', 'gif'];

    if (extensions.indexOf(extensionImage) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: "Tipo de archivo no permitido",
        });

    } else {
        var nameToSave = `${sku}-${imageType}.${extensionImage}`;

        // Movemos el archivo a una carpeta del servidor
        var pathSave = `./uploads/products/${sku}`;
        var path = `./uploads/products/${sku}/${nameToSave}`;
        if (!fileSystem.existsSync(pathSave)) {
            fileSystem.mkdirSync(pathSave);
        }
        if (fileSystem.existsSync(path)) {
            fileSystem.unlinkSync(path);
        }
        image.mv(path, err => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al mover el archivo",
                    error: err
                });
            }
        });
        return nameToSave;
    }
}


module.exports = app;