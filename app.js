var express = require('express');
var db = require('./config/dbConfig');

var app = express();

//==========================================================================
//                         MIDDLEWARE CORS
//==========================================================================
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next();
});



//==========================================================================
//                          BODY PARSER
//==========================================================================
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//==========================================================================
//                      DEFINICIÓN DE RUTAS
//==========================================================================
var mainRoute = require('./routes/main');
var loginRoute = require('./routes/login');
var productRoute = require('./routes/product');
var uploadImageRoute = require('./routes/uploadImageProdcut');
var sendImageRoute = require('./routes/sendImageProduct');
var carRoute = require('./routes/car');
var productCarRoute = require('./routes/productCar');
var userRoute = require('./routes/user');


//==========================================================================
//                              USO DE RUTAS
//==========================================================================
app.use('/users', userRoute);
app.use('/products-car', productCarRoute);
app.use('/car', carRoute);
app.use('/send-image', sendImageRoute);
app.use('/upload-image', uploadImageRoute);
app.use('/products', productRoute);
app.use('/login', loginRoute);
app.use('/', mainRoute);

//==========================================================================
//                      DEFINICIÓN DEL PUERTO
//==========================================================================

app.listen(3000, () => {
    // Para cambiar el color de la palabra "online", se hace lo siguiente:
    console.log('Corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});