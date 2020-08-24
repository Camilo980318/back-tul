var express = require('express');
var Car = require('../models/Car');

var app = express();

//===============================================================
//                    GET Car
//===============================================================

app.get('/', (req, res) => {

    Car.find({})
        .populate('user')
        .exec((err, cars) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: "Lo sentimos, hubo un error"
                });

            } else {

                res.status(200).json({
                    ok: true,
                    cars: cars
                });
            }
        });
});


//===============================================================
//                     POST Car
//===============================================================
app.post('/', (req, res) => {

    var car = new Car({
        status: 'pending'
    })

    car.save((err, carSaved) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: "Lo sentimos, ha ocurrido un error.",
                error: err
            });
        } else {
            res.status(200).json({
                ok: true,
                carSaved: carSaved
            });
        }
    });
});

//===============================================================
//                     PUT Car
//===============================================================

app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Car.findById(id, (err, carDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                message: "Lo sentimos, ha ocurrido un error.",
                error: err
            });
        } else {

            carDB.status = "completed"
            carDB.total = body.total;
            carDB.user = body.user;
            carDB.fecha_pago = Date.now();

            carDB.save((err, carUpdated) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        message: "Lo sentimos, ha ocurrido un error.",
                        error: err
                    });
                } else {
                    res.status(200).json({
                        ok: true,
                        carUpdated: carUpdated
                    });
                }
            });
        }
    });
});

module.exports = app;