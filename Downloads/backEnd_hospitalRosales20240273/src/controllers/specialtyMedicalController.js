import specialtyModel from "../models/specialtyMedicalModel.js";

const specialtyController = {};

specialtyController.getSpecialties = async (req, res) => {
  try {
    const specilty = await specialtyModel.find();
    return res.status(200).json(specilty);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

specialtyController.insertSpecialty = async (req, res) => {
  try {
    const { specialtyName, description, isAvaible } = req.body;
    const newSpecialty = new specialtyModel({
      specialtyName,
      description,
      isAvaible,
    });
    await newSpecialty.save();
    return res.status(201).json({ message: "Registered" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal error" });
  }
};

specialtyController.updateSpecialty = async (req, res) => {
  try {
    const { specialtyName, description, isAvaible } = req.body;
    const updated = await specialtyModel.findByIdAndUpdate(
      req.params.id,
      {
        specialtyName,
        description,
        isAvaible,
      },
      { new: true },
    );
    if (!updated) {
      return res.status(400).json({ message: "Not found" });
    }
    return res.status(201).json({ message: "Updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal error" });
  }
};

specialtyController.deleteSpecialty = async (req, res) => {
  try {
    const deleted = await specialtyModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal error" });
  }
};

export default specialtyController;
