const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelsmanagementSchema = new Schema ({
    permissiongroupname : String, 
    name:String,
    email:String
});

module.exports= mongoose.model('channelsmanagement',ChannelsmanagementSchema);
