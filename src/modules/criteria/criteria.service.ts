import { Injectable } from '@nestjs/common';
import { AirtableRecord } from 'src/interfaces/airtable.interface';
import { AirtableService } from '../airtable/airtable.service';

@Injectable()
export class CriteriaService {
  async getAllCriteria(): Promise<AirtableRecord[]> {
    const airtableService = new AirtableService();
    const response = await airtableService.findAll('risk_criteria');
    return response.records
    // return 'Hello World!';
  }

  async getCriteriaById(id: string) {
    // Implement get criteria by id logic here
    return { message: `Get criteria with id: ${id}` };
  }

  async createCriteria(criteriaDto: any) {
    // Implement create criteria logic here
    return { message: 'Criteria created successfully' };
  }
} 