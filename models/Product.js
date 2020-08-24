var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({

    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, default: 'Activo' },
    image: { type: String, required: false }

}, { collection: 'productos' });

module.exports = mongoose.model('Product', productSchema);