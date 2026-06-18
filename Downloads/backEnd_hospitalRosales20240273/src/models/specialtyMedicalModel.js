import { Schema, model } from "mongoose";
const medicalsAppointMentSchema = new Schema(
  {
    specialtyName: { type: String },
    description: { type: String },
    isAvaible: { Boolean },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("medicalsAppointMents", medicalsAppointMentSchema);
