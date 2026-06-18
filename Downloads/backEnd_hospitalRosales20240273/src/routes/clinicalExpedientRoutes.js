import express from "express";
import clinicalExpedientController from "../controllers/clinicalExpedientController.js";

const router = express.Router();

router
  .route("/")
  .get(clinicalExpedientController.getClinicalExpedient)
  .post(clinicalExpedientController.insertClinicalExpedient);
router
  .route("/:id")
  .put(clinicalExpedientController.updateClinicalExpedient)
  .delete(clinicalExpedientController.deleteClinicalExpedient);

  export default router