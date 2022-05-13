const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckoutsmanagementSchema = new Schema ({
    permissiongroupname : String, 
    name:String,
    email:String
});

module.exports= mongoose.model('checkoutsmanagement',CheckoutsmanagementSchema);
