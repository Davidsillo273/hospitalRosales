import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

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
app.use("/api/clinicalExpedient", clinicalExpedientRoutes);
app.use("/api/medicalAppointment", medicalAppointmentRoutes);
app.use("/api/medicalEquipment", medicalEquipmentRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/specialty", specialtyRoutes);

export default app;
