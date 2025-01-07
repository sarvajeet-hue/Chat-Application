
const mongoose = require('mongoose')

const registerModel = new mongoose.Schema({
    username : {
        type : String, 
        required: true
        
    }, 
    password : {
        type : String , 
        required : true
    }
})


module.exports = mongoose.model('registerModel' , registerModel)