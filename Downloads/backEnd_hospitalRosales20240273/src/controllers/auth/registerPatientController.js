import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import patientModel from "../../models/patientModel.js";

import { config } from "../../../config.js";

const registerPatientController = {};

registerPatientController.register = async (req, res) => {
  const {
    name,
    lastName,
    email,
    password,
    phone,
    address,
    phoneEmergencyContacts,
    isVerified,
    loginAttempts,
    timeOut,
  } = req.body;

  try {
    const existPatient = await patientModel.findOne({ email });
    if (existPatient) {
      return res.status(400).json({ message: "Patient already exist" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const verificationCode = crypto.randomBytes(3).toString("hex");

    const tokenCode = jsonwebtoken.sign(
      {
        name,
        lastName,
        email,
        password,
        passwordHash,
        phone,
        address,
        phoneEmergencyContacts,
        isVerified,
        loginAttempts,
        timeOut,
        verificationCode,
      },

      config.JWT.secret,

      { expiresIn: "15m" },
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 15 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Account verify",
      html: HTMLRecoveryEmail(code),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "error" });
      }
      res
        .status(200)
        .json({ message: "Patient registered, verify your email" });
    });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

registerPatientController.verifyCode = async (req, res) => {
  try {
    const { verificationCodeRequest } = req.body;

    const token = req.cookies.verificationToken;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const {
      name,
      lastName,
      email,
      passwordHash,
      phone,
      address,
      phoneEmergencyContacts,
      isVerified,
      loginAttempts,
      timeOut,
      verificationCode: storedCode,
    } = decoded;

    if (verificationCodeRequest !== storedCode) {
      return res.status(400).json({ message: "Invalid code" });
    }

    const newPatient = new patientModel({
      name,
      lastName,
      email,
      password: passwordHash,
      phone,
      address,
      phoneEmergencyContacts,
      isVerified: true,
      loginAttempts,
      timeOut,
    });

    await newPatient.save();

    const patient = await patientModel.findOne({ email });
    patient.isVerified = true;
    await patient.save();
    res.clearCookie("verificationToken");

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default registerPatientController;
