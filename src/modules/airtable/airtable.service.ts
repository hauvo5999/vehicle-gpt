import { Injectable } from '@nestjs/common';
import * as Airtable from 'airtable';
import {
  AirtableRecord,
  AirtableResponse,
} from '../../interfaces/airtable.interface';

@Injectable()
export class AirtableService {
  private readonly base: Airtable.Base;

  constructor() {
    this.base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID);
  }

  async findAll(tableName: string): Promise<AirtableResponse> {
    try {
      const records = await this.base(tableName).select().all();
      return {
        records: records.map(record => record.fields),
      };
    } catch (error) {
      throw new Error(`Failed to fetch records: ${error.message}`);
    }
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