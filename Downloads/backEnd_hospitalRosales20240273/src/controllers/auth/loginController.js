import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import patientModel from "../../models/patientModel.js";
import { config } from "../../../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await patientModel.findOne({ email });

    if (!userFound) {
      return res.status(404).json({ message: "Not found" });
    }
    if (userFound.timeOut && userFound.timeOut > DateNow()) {
      return res.status(403).json({ message: "Account banned" });
    }
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      userFound.loginAttempts = (userFound.loginAttempts || 0) + 1;

      if (userFound.loginAttempts >= 5) {
        userFound.timeOut = Date.now() + 15 * 60 * 1000;
        userFound.loginAttempts = 0;
        await userFound.save();
        return res.status(403).json({ message: "Banned Account" });
      }
      await userFound.save();
      return res.status(401).json({ message: "Incorrect password" });
    }
    userFound.loginAttempts = 0;
    userFound.timeOut = null;
    await userFound.save();

    const token = jsonwebtoken.sign(
      { id: userFound._id, usertype: "patient" },
      config.JWT.secret,
      { expiresIn: "30d" },
    );

    res.cookie("authCookie", token);

    return res.status(200).json({ message: "Login OK" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal error" });
  }
};
export default loginController;
