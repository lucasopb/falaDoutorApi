import { Router } from "express";
import { getTodayNotifications } from "../controllers/notificationController";

const router = Router();

router.get("/notifications/today", getTodayNotifications);

export default router;
