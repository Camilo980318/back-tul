//==========================================================================
//                             BASE DE DATOS
//==========================================================================
var mongoose = require('mongoose');

module.exports = mongoose.connection.openUri('mongodb://localhost:27017/PruebaTul', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
    }
});