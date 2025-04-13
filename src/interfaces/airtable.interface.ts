export interface AirtableRecord {
  [key: string]: any;
}

export interface AirtableResponse {
  records: AirtableRecord[];
} 