var express = require('express');

var jwt = require('jsonwebtoken');
var SEED = require('../config/seedToken');
var Admin = require('../models/Admin');

var app = express();


//===============================================================
//                     LOGIN ADMIN
//===============================================================
app.post('/', (req, res) => {

    var body = req.body;
    var email = body.email;
    var password = body.password;

    Admin.findOne({ email: email }, (err, adminDB) => {

        if (err) {

            res.status(500).json({
                ok: false,
                message: 'Lo sentimos, ha ocurrido un error',
                error: err
            });

        } else if (!adminDB) {

            res.status(404).json({
                ok: false,
                message: 'Usuario no registrado',
            });

        } else if (adminDB.password != password) {

            res.status(400).json({
                ok: false,
                message: 'Correo o contraseña inválidos',
            });

        } else {

            var token = jwt.sign({ admin: adminDB },
                "5513b511-e6f6-408e-a017-aeb099dd0b86",
                { expiresIn: 3600 });

            adminDB.password = ':)';

            res.status(200).json({
                ok: true,
                admin: adminDB,
                token: token
            });
        }
    });
});

module.exports = app;