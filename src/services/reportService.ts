import { filterDoctors } from '../repositories/doctorRepository';
import { filterPatients } from '../repositories/patientRepository';
import { filterHealthInsurances } from '../repositories/healthInsuranceRepository';

export async function generateReport(
  entity: string,
  filters: any,
  limit: number, 
  offset: number
) {
  switch (entity) {
    case 'doctor':
      return filterDoctors(filters, limit, offset);
    case 'patient':
      return filterPatients(filters, limit, offset);
    case 'health_insurance':
      return filterHealthInsurances(filters, limit, offset);
    default:
      throw new Error('Entidade inválida');
  }
}

