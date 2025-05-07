import { Router } from "express";
import {
  createPatientHandler,
  getHealthInsurancesHandler,
  getHealthInsuranceByIdHandler,
  updateHealthInsuranceHandler,
  deleteHealthInsuranceHandler
} from "../controllers/healthInsuranceController";

const router = Router();

router.post("/", createPatientHandler);
router.get("/", getHealthInsurancesHandler);
router.get("/:id", getHealthInsuranceByIdHandler);
router.put("/:id", updateHealthInsuranceHandler);
router.delete("/:id", deleteHealthInsuranceHandler);

export default router;
