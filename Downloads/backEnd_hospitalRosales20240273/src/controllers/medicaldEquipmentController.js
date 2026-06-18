import medicalEquipmentModel from "../models/medicalEquipmentModel";

const medicalEquipmentController = {};

medicalEquipmentController.insertMedicalEquipment = async (req, res) => {
  try {
    const {
      equipmentName,
      description,
      brande,
      model,
      purchaseDate,
      maintenceDate,
      condition,
      status,
      isAvaible,
    } = req.body;

    const image = req.file ? req.file.path : "";

    const newMedicalEquipment = new medicalEquipmentController({
      equipmentName,
      description,
      brande,
      model,
      purchaseDate,
      maintenceDate,
      condition,
      image,
      status,
      isAvaible,
    });

    await newMedicalEquipment.save();
    return res.status(201).json({ message: "Registered" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal error" });
  }
};