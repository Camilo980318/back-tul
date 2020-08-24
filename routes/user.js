var express = require('express');
var app = express();
var User = require('../models/User');

app.post('/', (req, res) => {

    var body = req.body;

    var user = new User({
        name: body.name,
        phone: body.phone,
        email: body.email

    });

    user.save((err, userPosted) => {

        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Lo sentimos, ocurrió un error',
                err: err
            });
        } else {
            res.status(200).json({
                ok: true,
                userPosted: userPosted,
                id: userPosted._id
            });
        }
    });
});

module.exports = app;