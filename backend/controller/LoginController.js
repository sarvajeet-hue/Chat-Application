const loginModel = require("../model/Login");
const registerModel = require("../model/Register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Please fill all the details",
      });
    }

    const existedUser = await registerModel.findOne({ username });
    if (!existedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let verifyPassword;
    try {
      verifyPassword = await bcrypt.compare(password, existedUser.password);
      console.log("Password verification:", verifyPassword);
    } catch (error) {
      console.log("Error during password verification:", error);
      return res.status(500).json({
        message: "Error while verifying password",
      });
    }

    if (!verifyPassword) {
      return res.status(400).json({
        message: "Please enter the correct password",
      });
    }

    const options = {
      username: username,
      id: existedUser._id,
    };

    let token;
    try {
      token = jwt.sign(options, "sarvajeet", {
        expiresIn: "3d", // Use '3d' for more readable expiration time
      });
      console.log("Token generated:", token);

      // If you want to save the token to the database
      existedUser.token = token;
      await existedUser.save();  // Save the token to the user in the database
    } catch (error) {
      console.log("Error while generating the token:", error);
      return res.status(500).json({
        message: "Error while generating the token",
      });
    }

    console.log("Existed user after token assignment:", existedUser);

    // Send the token in the response body as well as in the cookie
    res.cookie("token", token, { httpOnly: true }).status(200).json({
      message: "Logged in successfully",
      data: existedUser,
      token: token, // Include the token in the response body
    });
  } catch (error) {
    console.log("Error in login controller:", error);
    res.status(500).json({
      message: "Something went wrong in the login controller",
    });
  }
};

module.exports = { loginController };
