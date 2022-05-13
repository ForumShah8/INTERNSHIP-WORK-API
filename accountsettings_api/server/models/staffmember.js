const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffmemberSchema = new Schema ({
    name:String,
    firstname : String, 
    lastname : String, 
    email : String, 
    status : String
});

module.exports= mongoose.model('Staffmember',StaffmemberSchema);