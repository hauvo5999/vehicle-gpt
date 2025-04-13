export interface AirtableRecord {
  id?: string;
  fields: Record<string, any>;
  createdTime?: string;
}

export interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
} 