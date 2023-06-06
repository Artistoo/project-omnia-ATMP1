const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    userName : {
        type : String , 
        require : true , 
    },
    LastName : {
        type : String , 
        require : true , 
    },
    Email : {
        type : String , 
        require : true , 
    },
    Password : {
        type : String , 
        require : true , 
    },
    RepeatPassword : {
        type : String , 
        require : true , 
    },
}) 