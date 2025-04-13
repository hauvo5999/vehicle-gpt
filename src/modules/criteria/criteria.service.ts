import { Injectable } from '@nestjs/common';
import { AirtableRecord } from 'src/interfaces/airtable.interface';
import { AirtableService } from '../../modules/airtable/airtable.service';

@Injectable()
export class CriteriaService {
  constructor(private readonly airtableService: AirtableService) {}

  async getAllCriteria(): Promise<AirtableRecord[]> {
    const response = await this.airtableService.findAll('risk_criteria');
    return response.records
    // return 'Hello World!';
  }

  async getCriteriaById(userId: string) {
    return this.airtableService.getRecords('Criteria', {
      filterByFormula: `{userId} = '${userId}'`
    });
  }

  async createCriteria(criteriaDto: any) {
    return this.airtableService.createRecord('Criteria', criteriaDto);
  }

  async createDefaultCriteria(userId: string) {
    const defaultCriteria = [
      {
        userId,
        name: 'Price',
        weight: 0.3,
        description: 'Vehicle price range'
      },
      {
        userId,
        name: 'Fuel Efficiency',
        weight: 0.2,
        description: 'Fuel consumption rate'
      },
      {
        userId,
        name: 'Safety',
        weight: 0.25,
        description: 'Safety features and ratings'
      },
      {
        userId,
        name: 'Comfort',
        weight: 0.15,
        description: 'Comfort features and space'
      },
      {
        userId,
        name: 'Maintenance',
        weight: 0.1,
        description: 'Maintenance cost and frequency'
      }
    ];

    return Promise.all(
      defaultCriteria.map(criteria => 
        this.airtableService.createRecord('Criteria', criteria)
      )
    );
  }
} 