const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissiongroupSchema = new Schema ({
    permissiongroupname : String, 
    members : Number
});

module.exports= mongoose.model('Permissiongroup',PermissiongroupSchema);
