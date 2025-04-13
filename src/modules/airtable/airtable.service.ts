import { Injectable } from '@nestjs/common';
import * as Airtable from 'airtable';
import { AirtableRecord } from '../../interfaces/airtable.interface';

interface AirtableRecordResponse {
  id: string;
  fields: Record<string, any>;
}

@Injectable()
export class AirtableService {
  private readonly base: Airtable.Base;

  constructor() {
    this.base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID);
  }

  async findAll(tableName: string): Promise<{ records: AirtableRecord[] }> {
    const records = await this.base(tableName).select().all();
    return { 
      records: records.map(record => (record as unknown as AirtableRecordResponse).fields as AirtableRecord)
    };
  }

  async getRecords(tableName: string, options?: any): Promise<any[]> {
    const records = await this.base(tableName).select(options).all();
    return records.map(record => {
      const response = record as unknown as AirtableRecordResponse;
      return {
        id: response.id,
        ...response.fields
      };
    });
  }

  async createRecord(tableName: string, data: any): Promise<any> {
    const record = await this.base(tableName).create(data);
    const response = record as unknown as AirtableRecordResponse;
    return {
      id: response.id,
      ...response.fields
    };
  }

  async findOne(tableName: string, id: string): Promise<AirtableRecord> {
    try {
      const record = await this.base(tableName).find(id);
      return record.fields;
    } catch (error) {
      throw new Error(`Failed to fetch record: ${error.message}`);
    }
  }

  async create(tableName: string, fields: Record<string, any>): Promise<AirtableRecord> {
    try {
      const record = await this.base(tableName).create(fields);
      return record.fields;
    } catch (error) {
      throw new Error(`Failed to create record: ${error.message}`);
    }
  }

  async update(tableName: string, id: string, fields: Record<string, any>): Promise<AirtableRecord> {
    try {
      const record = await this.base(tableName).update(id, fields);
      return record.fields;
    } catch (error) {
      throw new Error(`Failed to update record: ${error.message}`);
    }
  }

  async delete(tableName: string, id: string): Promise<boolean> {
    try {
      await this.base(tableName).destroy(id);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete record: ${error.message}`);
    }
  }
} 