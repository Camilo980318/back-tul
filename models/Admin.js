var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({

    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

}, { collection: 'admins' });

module.exports = mongoose.model('Admin', adminSchema);