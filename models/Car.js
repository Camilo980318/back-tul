var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var carSchema = new Schema({

    status: { type: String, required: true },

}, { collection: 'cars' });

module.exports = mongoose.model('Car', carSchema);