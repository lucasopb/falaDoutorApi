import { Request, Response } from "express";
import { listTodayNotifications } from "../services/notificationService";

export const getTodayNotifications = async (req: Request, res: Response) => {
  const notifications = await listTodayNotifications();
  res.json({ notifications });
};
