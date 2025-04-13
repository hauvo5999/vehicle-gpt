import { Injectable } from '@nestjs/common';
import * as Airtable from 'airtable';
import { AirtableRecord, AirtableResponse } from '../../interfaces/airtable.interface';

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
        records: records.map(record => ({
          id: record.id,
          fields: record.fields,
          createdTime: record._rawJson.createdTime,
        })),
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
      return {
        id: record.id,
        fields: record.fields,
        createdTime: record._rawJson.createdTime,
      };
    } catch (error) {
      throw new Error(`Failed to fetch record: ${error.message}`);
    }
  }

  async create(tableName: string, fields: Record<string, any>): Promise<AirtableRecord> {
    try {
      
      const record = await this.base(tableName).create(fields);
      return {
        id: record.id,
        fields: record.fields,
        createdTime: record._rawJson.createdTime,
      };
    } catch (error) {
      throw new Error(`Failed to create record: ${error.message}`);
    }
  }

  async update(tableName: string, id: string, fields: Record<string, any>): Promise<AirtableRecord> {
    try {
      const record = await this.base(tableName).update(id, fields);
      return {
        id: record.id,
        fields: record.fields,
        createdTime: record._rawJson.createdTime,
      };
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

  async findMany(tableName: string, filters: Record<string, any>): Promise<AirtableResponse> {
    try {
      const records = await this.base(tableName).select({
        filterByFormula: Object.keys(filters)
          .map(key => `{${key}} = '${filters[key]}'`)
          .join(' AND ')
      }).all();
      return {
        records: records.map(record => ({
          id: record.id,
          fields: record.fields,
          createdTime: record._rawJson.createdTime,
        })),
      };
    } catch (error) {
      throw new Error(`Failed to fetch records: ${error.message}`);
    }
  }

  async createMany(tableName: string, records: any[]): Promise<any> {
    const results =  this.base(tableName).create(records);
    return results;
  }

  async deleteMany(tableName: string, filters: Record<string, any>): Promise<boolean> {
    try {
      const records = await this.findMany(tableName, filters);
      await Promise.all(records.records.map(record => this.base(tableName).destroy(record.id)));
      return true;
    } catch (error) {
      throw new Error(`Failed to delete records: ${error.message}`);
    }
  }
}