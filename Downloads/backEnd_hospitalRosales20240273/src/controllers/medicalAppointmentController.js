import medicalAppointmentModel from "../models/medicalAppointmentModel.js";

const medicalAppointmentController = {};

medicalAppointmentController.getMedicalAppointment = async (req, res) => {
  try {
    const medicalAppointment = await medicalAppointmentModel
      .find()
      .populate("patient_id", "name lastName")
      .populate("specialty_id", "specialtyName");
    return res.status(200).json(medicalAppointment);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

medicalAppointmentController.insertMedicalAppointment = async (req, res) => {
  try {
    const {
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      obsertations,
    } = req.body;

    const newMedicalAppointment = new medicalAppointmentModel({
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      obsertations,
    });
    await newMedicalAppointment.save();
    return res.status(201).json({ message: "Registered" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal error" });
  }
};

medicalAppointmentController.updateMedicalAppointment = async (req, res) => {
  try {
    const {
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      obsertations,
    } = req.body;
    const updated = await medicalAppointmentModel.findBydIdAndUpdate(
      req.params.id,
      {
        patient_id,
        specialty_id,
        appointmentDate,
        reason,
        status,
        obsertations,
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

medicalAppointmentController.deleteMedicalAppointment = async (req, res) => {
  try {
    const deleted = await medicalAppointmentModel.findBydIdAndDelete(
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

export default medicalAppointmentController;
