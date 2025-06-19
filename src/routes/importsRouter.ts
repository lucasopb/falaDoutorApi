import { Router } from "express";
import multer from "multer";
import { importDoctorsHandler, importHealthInsurancesHandler, importPatientsHandler } from "../controllers/importsExcelController";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/import/doctors", upload.single("file"), importDoctorsHandler);
router.post("/import/health-insurances", upload.single("file"), importHealthInsurancesHandler);
router.post("/import/patients", upload.single("file"), importPatientsHandler);

export default router;
