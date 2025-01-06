const mongoose = require('mongoose');
require('dotenv').config();


// , {
//     useNewUrlParser : true, 
//     useUnifiedTopology : true
// }

 const database = () => {
    mongoose.connect('mongodb://localhost:27017/chatapp').then(() => {
        console.log("database connected successfully")
    }).catch((err) => {
        console.log("err" , err)
    })
}

module.exports = {database}