import { Request, Response } from 'express';
import { generateReport } from '../services/reportService';

export const reportController = async (req: Request, res: Response): Promise<void> => {
  const { entity, filters } = req.body;
  const { page, limit, offset } = req.pagination!;

  const { data, total } = await generateReport(entity, filters, limit, offset);

  if (!data) throw new Error("Erro ao gerar Relatório");

  res.status(200).json({
    data: data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  });
};
