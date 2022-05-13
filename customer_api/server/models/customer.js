const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema ({
    name:String,
    orders:Number,
    email:String,
    joindate:String, 
    address: String

});

module.exports= mongoose.model('Customer',customerSchema);