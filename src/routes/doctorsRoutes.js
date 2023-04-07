import { Router } from "express";
import { validadeSchema } from "../middlewares/validateSchema.js";
import { signUpSchema } from "../schema/doctorsSchema.js";
import doctorController from "../controllers/doctorController.js";

const doctorRoutes = Router();

doctorRoutes.post("/signUp", validadeSchema(signUpSchema), doctorController.createDoctor);
doctorRoutes.post("/signIn", doctorController.signIn);

export default doctorRoutes