import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ApiError } from "../helpers/api-erros";

export const errorHandler = (
  err: Error & Partial<ApiError>, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  console.error("Erro capturado:", err);

  const statusCode = err.statusCode ?? 500;
  const message = err.statusCode ? err.message : "Internal Server Error";
  res.status(statusCode).json({ message });
};

