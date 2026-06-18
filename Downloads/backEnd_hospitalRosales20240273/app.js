import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

//Auths
import loginRoutes from "./src/routes/auth/loginRoutes.js";
import logoutRoutes from "./src/routes/auth/logoutRoutes.js";
import registerPatientRoutes from "./src/routes/auth/registerPatientRoutes.js";

import clinicalExpedientRoutes from "./src/routes/clinicalExpedientRoutes.js";
import medicalAppointmentRoutes from "./src/routes/medicalAppointmentRoutes.js";
import medicalEquipmentRoutes from "./src/routes/medicalEquipmentRoutes.js";
import patientRoutes from "./src/routes/patientRoutes.js";
import specialtyRoutes from "./src/routes/specialtyRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http:localhost:5173"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/registerPatient", registerPatientRoutes);
app.use("/api/clinicalExpedient", clinicalExpedientRoutes);
app.use("/api/medicalAppointment", medicalAppointmentRoutes);
app.use("/api/medicalEquipment", medicalEquipmentRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/specialty", specialtyRoutes);

export default app;
