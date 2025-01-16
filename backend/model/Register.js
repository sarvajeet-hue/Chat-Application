
const mongoose = require('mongoose')

const registerModel = new mongoose.Schema({
    username : {
        type : String, 
        unique : true  , 
        required: true , 
        
        
    }, 
    password : {
        type : String , 
        required : true
    } , 
    token : {
        type: String, 
    }
})


module.exports = mongoose.model('registerModel' , registerModel)