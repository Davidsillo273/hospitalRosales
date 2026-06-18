import clinicalExpedientModel from "../models/clinicalExpedientModel.js";

const clinicalExpedientController = {};

clinicalExpedientController.getMedicalAppointment = async (req, res) => {
  try {
    const clinicalExpedient = await clinicalExpedientModel
      .find()
      .populate("patient_id", "name lastName");
    return res.status(200).json(clinicalExpedient);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

clinicalExpedientController.insertClinicalExpedient = async (req, res) => {
  try {
    const { patient_id, diagnosis, medications, medicalNotes } = req.body;

    const newClinicalExpendient = new medicalAppointmentModel({
      patient_id,
      diagnosis,
      medications,
      medicalNotes,
    });
    await newClinicalExpendient.save();
    return res.status(201).json({ message: "Registered" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal error" });
  }
};

clinicalExpedientController.updateClinicalExpedient = async (req, res) => {
  try {
    const { patient_id, diagnosis, medications, medicalNotes } = req.body;
    const updated = await clinicalExpedientModel.findBydIdAndUpdate(
      req.params.id,
      {
        patient_id,
        diagnosis,
        medications,
        medicalNotes,
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

clinicalExpedientController.deleteClinicalExpedient = async (req, res) => {
  try {
    const deleted = await clinicalExpedientModel.findBydIdAndDelete(
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
