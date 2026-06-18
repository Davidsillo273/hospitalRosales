import { Schema, model } from "mongoose";
const clinicalExpedientSchema = new Schema(
  {
    patient_id: { type: Schema.Types.ObjectId, ref: "patients" },
    diagnosis: { type: String },
    medications: [
      {
        medicineName: { type: String },
      },
    ],
    medicalNotes: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("clinicalExpedients", clinicalExpedientSchema);
