const  registerModel  = require("../model/Register");
const bcrypt = require('bcrypt')



const registerController = async(req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Please fill all the details",
      });
    }

    const existedUser = await registerModel.findOne({username})

    if(existedUser){
        return res.status(302).json({
            message : "User ALready Registered"
        })
    }

    let hashPassword ; 
    try {
        hashPassword = await bcrypt.hash(password , 10);
    }catch(error){
        console.log("error in generating the password" , error)
    }


    const response = await registerModel.create({ username, password : hashPassword });

    if (!response) {
      res.status(400).json({
        message: "Cannot create into the database ",
      });
    }

    res.status(200).json({
      message: "data created successfully",
      data: response,
    });
  } catch (error) {
    console.log("error" , error)
    res.status(500).json({
      message: "somthing went wrong",
      error: error,
    });
  }
};

module.exports = { registerController };
