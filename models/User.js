var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },

}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);