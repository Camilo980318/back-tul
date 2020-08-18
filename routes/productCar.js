var express = require('express');

var mdAuth = require('../middlewares/auth');
var ProductsCar = require('../models/ProductsCar');

var app = express();

//===============================================================
//                    GET ProductsCar
//===============================================================

app.get('/', (req, res) => {

    ProductsCar.find({})
        .populate('product_id')
        .populate('car_id')
        .exec((err, productsCars) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: "Lo sentimos, hubo un error"
                });

            } else {

                res.status(200).json({
                    ok: true,
                    productsCars: productsCars
                });
            }
        });
});


//===============================================================
//                     POST ProductsCar
//===============================================================

app.post('/', (req, res) => {

    var body = req.body;

    var productCar = new ProductsCar({
        car_id: body.car_id,
        product_id: body.product_id,
        quantity: body.quantity
    });

    productCar.save((err, productCarSaved) => {

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: "Lo sentimos, hubo un error",
                err: err
            });

        } else {

            res.status(200).json({
                ok: true,
                productCarSaved: productCarSaved,
            });
        }
    });
});


//===============================================================
//                     PUT ProductsCar
//===============================================================

app.put('/:id', (req, res) => {

    var body = req.body;
    var id = req.params.id;

    ProductsCar.findById(id, (err, productcarDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: "Lo sentimos, hubo un error",
                err: err
            });

        } else {

            productcarDB.quantity = body.quantity
            productcarDB.save((err, productCarUpdated) => {

                if (err) {
                    res.status(500).json({
                        ok: false,
                        mensaje: "Lo sentimos, hubo un error",
                        err: err
                    });

                } else {

                    res.status(200).json({
                        ok: true,
                        productCarUpdated: productCarUpdated,
                    });
                }
            });
        }
    });

});

//===============================================================
//                    DELETE ProductsCar
//===============================================================

app.delete('/:id', (req, res) => {
    var id = req.params.id;
    ProductsCar.findByIdAndRemove(id, (err, productcarDel) => {

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: "Lo sentimos, hubo un error",
                err: err
            });
        } else {
            res.status(200).json({
                ok: true,
                productcarDel: productcarDel,
            });
        }
    });
});


module.exports = app;