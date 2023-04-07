import { Router } from "express";
import doctorRoutes from "./doctorsRoutes.js";
import patientRoutes from "./patientsRoutes.js";
import appointmentRoutes from "./appointmentsRoutes.js";

const routes = Router();

routes.use("/patients", patientRoutes);
routes.use("/doctors", doctorRoutes);
routes.use("/appointments", appointmentRoutes);

export default routes;

