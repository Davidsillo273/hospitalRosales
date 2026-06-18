import medicalEquipmentModel from "../models/medicalEquipmentModel.js";

const medicalEquipmentController = {};

medicalEquipmentController.getMedicalEquipments = async (req, res) => {
  try {
    const medicalEquipment = await medicalEquipmentModel.find;
    return res.status(200).json(medicalEquipment);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

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

    const newMedicalEquipment = new medicalEquipmentController({
      equipmentName,
      description,
      brande,
      model,
      purchaseDate,
      maintenceDate,
      condition,
      image: req.file.path,
      public_id: req.file.filename,
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

medicalEquipmentController.updateMedicalEquipment = async (req, res) => {
  try {
    let {
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

    const medicalEquipmentFound = await medicalEquipmentModel.findById(
      req.params.id,
    );

    const updatedMedicalEquipment = {
      equipmentName,
      description,
      brande,
      model,
      purchaseDate,
      maintenceDate,
      condition,
      status,
      isAvaible,
    };
    if (req.file) {
      await cloudinary.uploader.destroy(medicalEquipmentFound.public_id);
      updateMedicalEquipment.image = req.file.path;
      updateMedicalEquipment.public_id = req.file.filename;
    }
    await medicalEquipmentFound.findBydIdAndUpdate(
      req.params.id,
      updatedMedicalEquipment,
      {
        new: true,
      },
    );
    return res.status(200).json({ message: "Updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal error" });
  }
};

medicalEquipmentController.deleteMedicalEquipment = async (req, res) => {
  try {
    const deleted = await medicalEquipmentModel.findBydIdAndDelete(
      req.params.id,
    );
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal error" });
  }
};

export default medicalEquipmentController;
