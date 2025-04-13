import { Injectable } from '@nestjs/common';
import { AirtableRecord, AirtableResponse } from 'src/interfaces/airtable.interface';
import { AirtableService } from '../airtable/airtable.service';

@Injectable()
export class CriteriaService {

  constructor(private readonly airtableService: AirtableService) {}

  async getAllCriteria(): Promise<AirtableResponse> {
    return this.airtableService.findAll('risk_criteria');
  }

  async getCriteriaById(id: string) {
    return this.airtableService.findOne('risk_criteria', id);
  }

  async createCriteria(criteriaDto: any) {
    return this.airtableService.create('risk_criteria', criteriaDto);
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