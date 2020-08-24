var express = require('express');

var mdAuth = require('../middlewares/auth');
var Product = require('../models/Product');

var app = express();


//===============================================================
//                     GET PRODUCTS
//===============================================================
app.get('/', (req, res) => {

    Product.find({}, (err, products) => {

        if (err) {
            res.status(500).json({
                ok: false,
                message: "Lo sentimos, ha ocurrido un error.",
                error: err
            });
        } else {
            res.status(200).json({
                ok: true,
                products: products
            });
        }
    });
});

//===============================================================
//                     POST PRODUCTS
//===============================================================

app.post('/', mdAuth.verifyToken, (req, res) => {

    var body = req.body;

    var product = new Product({
        sku: body.sku,
        name: body.name,
        description: body.description,
        price: body.price
    });

    product.save((err, productSaved) => {

        if (err) {
            res.status(500).json({
                ok: false,
                message: "Lo sentimos, ha ocurrido un error.",
                error: err
            });
        } else {
            res.status(200).json({
                ok: true,
                message: "¡Producto guadado correctamente!",
                productSaved: productSaved
            });
        }

    });

})

module.exports = app;