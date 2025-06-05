import { filterDoctors } from '../repositories/doctorRepository';
import { filterPatients } from '../repositories/patientRepository';
import { filterHealthInsurances } from '../repositories/healthInsuranceRepository';
import { BadRequestError } from '../helpers/api-erros';
import { doctorFilterSchema } from '../validators/report/doctorFilterSchema';
import { healthInsuranceFilterSchema } from '../validators/report/healthIsuranceFilterSchema';
import { patientFilterSchema } from '../validators/report/patientFilterSchema';

export async function generateReport(
  entity: string,
  filters: any,
  limit: number, 
  offset: number
) {
  switch (entity) {
    case 'doctor':
      const validDoctorFilters = doctorFilterSchema.safeParse(filters);
    
      if (!validDoctorFilters.success) {
        const errorMessages = validDoctorFilters.error.errors
          .map((err: any) => err.message)
          .join(", ");
        throw new BadRequestError(errorMessages);
      }

      return filterDoctors(validDoctorFilters.data, limit, offset);
    case 'patient':
      const validPatientFilters = patientFilterSchema.safeParse(filters);
    
      if (!validPatientFilters.success) {
        const errorMessages = validPatientFilters.error.errors
          .map((err: any) => err.message)
          .join(", ");
        throw new BadRequestError(errorMessages);
      }

      return filterPatients(validPatientFilters.data, limit, offset);
    case 'health_insurance':
      const validIsuranceFilters = healthInsuranceFilterSchema.safeParse(filters);
    
      if (!validIsuranceFilters.success) {
        const errorMessages = validIsuranceFilters.error.errors
          .map((err: any) => err.message)
          .join(", ");
        throw new BadRequestError(errorMessages);
      }

      return filterHealthInsurances(validIsuranceFilters.data, limit, offset);
    default:
      throw new BadRequestError('Entidade inválida');
  }
}

