import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import medicalEquipment from "./src/routes/medicalEquipmentRoutes.js";
const app = express();

app.use(
  cors({
    origin: ["http:localhost:5173"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/medicalEquipment", medicalEquipment);

export default app;
