const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppsmanagementSchema = new Schema ({
    permissiongroupname : String, 
    name:String,
    email:String
});

module.exports= mongoose.model('appsmanagement',AppsmanagementSchema);
