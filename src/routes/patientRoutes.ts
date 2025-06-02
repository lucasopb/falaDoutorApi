import { Router } from "express";
import {
  createPatientHandler,
  getPatientsHandler,
  getPatientByIdHandler,
  updatePatientHandler,
  deletePatientHandler
} from "../controllers/patientController";
import { paginate } from "../middlewares/pagination";

const router = Router();

router.post("/", createPatientHandler);
router.get("/", paginate, getPatientsHandler);
router.get("/:id", getPatientByIdHandler);
router.put("/:id", updatePatientHandler);
router.delete("/:id", deletePatientHandler);

export default router;
