import { Request, Response, NextFunction } from "express";
import { ApiError } from "../helpers/api-erros"

export const errorHandler = (
  err: Error & Partial<ApiError>, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const statusCode = err.statusCode ?? 500
  const message = err.statusCode ? err.message : "Internal Server Error"
  return res.status(statusCode).json({message})
};
