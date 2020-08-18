var express = require('express');
var Car = require('../models/Car');

var app = express();


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

    Car.findById(id, (err, carDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                message: "Lo sentimos, ha ocurrido un error.",
                error: err
            });
        } else {

            carDB.status = "completed"
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