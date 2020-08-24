var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var carSchema = new Schema({

    status: { type: String, required: true },
    total: { type: Number, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    fecha_pago: { type: Date, required: false }

}, { collection: 'cars' });

module.exports = mongoose.model('Car', carSchema);