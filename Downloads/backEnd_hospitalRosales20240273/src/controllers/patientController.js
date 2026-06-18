import patientModel from "../models/patientModel.js";

const patientController = {};

patientController.getPatients = async (req, res) => {
  try {
    const patient = await patientModel.find();
    return res.status(200).json(patient);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

patientController.updatePatient = async (req, res) => {
  try {
    let {
      name,
      lastName,
      email,
      password,
      phone,
      address,
      phoneEmergencyContacts,
      isVerified,
      loginAttempts,
      timeOut,
    } = req.body;

    const patientFound = await patientModel.findById(req.params.id);

    const updatedPatient = {
      name,
      lastName,
      email,
      password,
      phone,
      address,
      phoneEmergencyContacts,
      isVerified,
      loginAttempts,
      timeOut,
    };
    if (req.file) {
      await cloudinary.uploader.destroy(patientFound.public_id);
      updatePatient.profilePhoto = req.file.path;
      updatePatient.public_id = req.file.filename;
    }
    await patientFound.findByIdAndUpdate(req.params.id, updatedPatient, {
      new: true,
    });
    return res.status(200).json({ message: "Updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal error" });
  }
};

patientController.deletePatient = async (req, res) => {
  try {
    const deleted = await patientModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal error" });
  }
};

export default patientController;
