import { Schema, model } from "mongoose";
const specialtyMedicalSchema = new Schema(
  {
    specialtyName: { type: String },
    description: { type: String },
    isAvaible: { type: Boolean },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("pecialtyMedicals", specialtyMedicalSchema);
