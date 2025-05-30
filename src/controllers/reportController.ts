import { Request, Response } from 'express';
import { generateReport } from '../services/reportService';

export const reportController = async (req: Request, res: Response): Promise<void> => {
  const { entity, filters } = req.body;

    const data = await generateReport(entity, filters);
    if (!data) throw new Error("Erro ao gerar Relatorio")
    res.status(200).json(data);
}