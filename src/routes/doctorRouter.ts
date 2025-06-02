import { Router } from "express";
import {
  createDoctorHandler,
  getDoctorsHandler,
  getDoctorByIdHandler,
  updateDoctorHandler,
  deleteDoctorHandler
} from "../controllers/doctorController";
import { paginate } from "../middlewares/pagination";


const router = Router();

router.post("/", createDoctorHandler);
router.get("/", paginate, getDoctorsHandler);
router.get("/:id", getDoctorByIdHandler);
router.put("/:id", updateDoctorHandler);
router.delete("/:id", deleteDoctorHandler);

export default router;
