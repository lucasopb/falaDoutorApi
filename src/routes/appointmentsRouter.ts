import express from "express";
import { createAppointmentHandler,updateAppointmentHandler, getAppointmentByIdHandler, getAppointmentsHandler, deleteAppointmentHandler } from "../controllers/appointmentController";
const router = express.Router();

router.post("/", createAppointmentHandler);
router.get("/", getAppointmentsHandler);
router.get("/:id", getAppointmentByIdHandler);
router.put("/:id", updateAppointmentHandler);
router.delete("/:id", deleteAppointmentHandler);


export default router;
