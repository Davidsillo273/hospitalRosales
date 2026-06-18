import { Schema, model } from "mongoose";
const medicalsAppointMentSchema = new Schema(
  {
    patient_id: { type: Schema.Types.ObjectId, ref: "patients" },
    specialty_id: { type: Schema.Types.ObjectId, ref: "specialties" },
    appointmentDate: { type: Date },
    reason: { type: String },
    status: { type: Boolean },
    observations: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("medicalsAppointMents", medicalsAppointMentSchema);
