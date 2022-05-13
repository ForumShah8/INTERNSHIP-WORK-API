const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomersupportSchema = new Schema ({
    permissiongroupname : String, 
    name:String,
    email:String
});

module.exports= mongoose.model('customersupport',CustomersupportSchema);
