import express from "express";
import { createDoctorHealthInsuranceHandler, getAllDoctorHealthInsurancesHandler, getDoctorHealthInsuranceByIdHandler, deleteDoctorHealthInsuranceHandler } from "../controllers/doctorHealthInsurancesController";

const router = express.Router();

router.post("/", createDoctorHealthInsuranceHandler);
router.get("/", getAllDoctorHealthInsurancesHandler);
router.get("/:id", getDoctorHealthInsuranceByIdHandler);
router.delete("/:id", deleteDoctorHealthInsuranceHandler);


export default router;
