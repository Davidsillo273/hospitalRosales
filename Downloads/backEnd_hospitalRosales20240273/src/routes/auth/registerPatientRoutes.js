import express from "express";
import registerPatientController from "../../controllers/auth/registerPatientController.js";

const router = express.Router();

router.route("register").post(registerPatientController.register);
router.route("verifyCode").post(registerPatientController.verifyCode);
export default router;
