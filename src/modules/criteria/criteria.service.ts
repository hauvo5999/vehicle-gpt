import { Injectable } from '@nestjs/common';
import { AirtableRecord } from 'src/interfaces/airtable.interface';
import { AirtableService } from '../../modules/airtable/airtable.service';

interface AirtableResponse {
  records: Array<{
    id: string;
    fields: {
      criteria_key: string;
      [key: string]: any;
    };
  }>;
}

@Injectable()
export class CriteriaService {
  constructor(private readonly airtableService: AirtableService) {}

  async getAllCriteria(): Promise<AirtableRecord[]> {
    const response = await this.airtableService.findAll('risk_criteria');
    return response.records;
  }

  async getCriteriaById(userId: string) {
    return this.airtableService.getRecords('Criteria', {
      filterByFormula: `{userId} = '${userId}'`
    });
  }

  async getCriteriaByEmail(email: string): Promise<AirtableResponse> {
    const criteria = await this.airtableService.getRecords('criteria_config', {
      filterByFormula: `{email} = '${email}'`
    });

    return { records: criteria };
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

  async getCriteriaConfigByEmail(email: string) {
    return this.airtableService.findMany('criteria_config', { email: email });
  }

  async createOrUpdateConfigs(configDto: any) {
    const userId = 2; // TODO: get user id from auth
    
    // Delete existing records for this user
    await this.airtableService.deleteMany('criteria_config', { user_id: userId });

    // Prepare data with user_id
    const data = configDto.map(config => ({
      fields: {
        ...config,
        user_id: userId
      }
    }));

    try {
      // Create new records
      const configs = await this.airtableService.createMany('criteria_config', data);
      return configs;
    } catch (error) {
      throw new Error(`Failed to create new config records: ${error.message}`);
    }
  }

  async deleteByUserId(userId: string) {
    const filters = {
      filterByFormula: `{user_id} = '${userId}'`
    };
    return this.airtableService.deleteMany('criteria_config', filters);
  }
}