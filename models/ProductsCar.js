var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsCarSchema = new Schema({

    car_id: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true }

}, { collection: 'products_car' });

module.exports = mongoose.model('ProductsCar', productsCarSchema);