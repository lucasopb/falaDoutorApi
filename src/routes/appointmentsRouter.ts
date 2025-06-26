import express from "express";
import { createAppointmentHandler, getAppointmentByIdHandler, getAppointmentsHandler, deleteAppointmentHandler } from "../controllers/appointmentController";
const router = express.Router();

router.post("/", createAppointmentHandler);
router.get("/", getAppointmentsHandler);
router.get("/:id", getAppointmentByIdHandler);
router.delete("/:id", deleteAppointmentHandler);


export default router;
