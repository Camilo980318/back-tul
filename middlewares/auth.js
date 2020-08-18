var jwt = require('jsonwebtoken');
var SEED = '5513b511-e6f6-408e-a017-aeb099dd0b86';


//===============================================================
//                     VERIFY TOKEN
//===============================================================
module.exports.verifyToken = ((req, res, next) => {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {

            res.status(403).json({
                ok: false,
                mensaje: "Token no válido",
                err: err
            });

        } else {

            req.admin = decoded.admin;
            req.admin.password = ':)';

            next();
        }

    });
});