import express from "express";
import medicalAppointmentController from "../controllers/medicalAppointmentController.js";

const router = express.Router();

router
  .route("/")
  .get(medicalAppointmentController.getMedicalAppointment)
  .post(medicalAppointmentController.insertMedicalAppointment);
router
  .route("/:id")
  .put(medicalAppointmentController.updateMedicalAppointment)
  .delete(medicalAppointmentController.deleteMedicalAppointment);

export default router;
