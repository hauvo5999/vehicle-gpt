import { Injectable } from '@nestjs/common';
import { CriteriaService } from '../criteria/criteria.service';
import axios from 'axios';

interface AirtableResponse {
  records: Array<{
    records: Array<{
      fields: {
        criteria_key: string;
        [key: string]: any;
      };
    }>;
  }>;
}

@Injectable()
export class ChatService {
  constructor(private readonly criteriaService: CriteriaService) {}

  async sendMessage(message: string, email: string) {
    // Lấy criteria từ Airtable dựa vào email
    const criteria = await this.criteriaService.getCriteriaByEmail(email);

    console.log('criteria', criteria);
    const criteriaKeys = (criteria as any).records.map((record: any) => record.records.map((r: any) => r.fields.criteria_key)).flat();

    // Gọi webhook N8N
    const response = await axios.post(process.env.N8N_WEBHOOK_URL, {
      risk_criterias: criteriaKeys,
      message: message
    });

    // Trả về kết quả từ webhook
    return {
      message,
      criteria: criteriaKeys,
      response: response.data
    };
  }
} 