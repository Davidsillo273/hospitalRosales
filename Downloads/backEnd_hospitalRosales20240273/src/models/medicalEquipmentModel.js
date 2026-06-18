import { Schema, model } from "mongoose";
const medicalEquipmentSchema = new Schema(
  {
    equipmentName: { type: String },
    description: { type: String },
    brand: { type: String },
    model: { type: String },
    purchaseDate: { type: Date },
    maintenceDate: { type: Date },
    condition: { type: String },
    image: { type: String },
    status: { type: Boolean },
    isAvalible: { type: Boolean },
    public_id: { String },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("medicalEquipments", medicalEquipmentSchema);
