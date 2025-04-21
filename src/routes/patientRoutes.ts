import { Router } from "express";
import {
  createPatientHandler,
  getPatientsHandler,
  getPatientByIdHandler,
  updatePatientHandler,
  deletePatientHandler
} from "../controllers/patientController";

const router = Router();

router.post("/", createPatientHandler);
router.get("/", getPatientsHandler);
router.get("/:id", getPatientByIdHandler);
router.put("/:id", updatePatientHandler);
router.delete("/:id", deletePatientHandler);

export default router;
