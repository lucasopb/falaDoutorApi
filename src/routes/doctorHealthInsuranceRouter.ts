import express from "express";
import { createDoctorHealthInsuranceHandler } from "../controllers/doctorHealthInsurancesController";

const router = express.Router();

router.post("/", createDoctorHealthInsuranceHandler);

export default router;
