const mongoose= require('mongoose');

const UserDeatilSchema = new mongoose.Schema({
    name:{type: String, required: true},
    usertype:{type: String, required: true},
    busno:{type: String, required: true},
    number:{type: Number, unique: true},
    password:{type: String, required: true},
    
},{
    collection:"UserInfo"
});

mongoose.model("UserInfo",UserDeatilSchema)



const LocationSchema = new mongoose.Schema({
    name:{type: String, },
    busno:{type: String, required: true},
    number:{type: Number, unique: true},
    location:{type: Object, required: true},
    
},{
    collection:"BusLocation"
});

mongoose.model("BusLocation",LocationSchema)