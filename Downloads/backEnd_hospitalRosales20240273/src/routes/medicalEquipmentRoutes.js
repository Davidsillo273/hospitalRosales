import express from "express";
import medicalEquipmentController from "../controllers/medicaldEquipmentController.js";
import upload from "../utils/cloudinaryConfig.js";
const router = express.Router();

router
  .route("/")
  .get(medicalEquipmentController.getMedicalEquipments)
  .post(
    upload.single("image"),
    medicalEquipmentController.insertMedicalEquipment,
  );
router
  .route("/:id")
  .put(
    upload.single("image"),
    medicalEquipmentController.updateMedicalEquipment,
  )
  .delete(medicalEquipmentController.deleteMedicalEquipment);

export default router;
