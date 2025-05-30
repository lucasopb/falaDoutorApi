import { filterDoctors } from '../repositories/doctorRepository';
import { filterPatients } from '../repositories/patientRepository';
import { filterHealthInsurances } from '../repositories/healthInsuranceRepository';

export async function generateReport(entity: string, filters: any) {
  switch (entity) {
    case 'doctor':
      return filterDoctors(filters);
    case 'patient':
      return filterPatients(filters);
    case 'health_insurance':
      return filterHealthInsurances(filters);
    default:
      throw new Error('Entidade inválida');
  }
}
