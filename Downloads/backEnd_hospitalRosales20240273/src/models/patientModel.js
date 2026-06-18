import { Schema, model } from "mongoose";
const patientSchema = new Schema(
  {
    name: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    address: { type: String },
    phoneEmergencyContacts: [
      {
        phone: { type: String },
        nameEmergencyContact: { type: String },
      },
    ],
    profilePhoto: { type: String },
    isVerified: { type: Boolean },
    loginAttempts: { Number },
    timeOut: { Date },
    public_id: { String },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("patients", patientSchema);
