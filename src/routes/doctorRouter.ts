import { Router } from "express";
import {
  createDoctorHandler,
  getDoctorsHandler,
  getDoctorByIdHandler,
  updateDoctorHandler,
  deleteDoctorHandler
} from "../controllers/doctorController";

const router = Router();

router.post("/", createDoctorHandler);
router.get("/", getDoctorsHandler);
router.get("/search/:id", getDoctorByIdHandler);
router.put("/:id", updateDoctorHandler);
router.delete("/:id", deleteDoctorHandler);

export default router;
