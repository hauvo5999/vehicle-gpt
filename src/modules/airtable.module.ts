import { Module } from '@nestjs/common';
import { AirtableService } from './airtable/airtable.service';

@Module({
  providers: [AirtableService],
  exports: [AirtableService],
})
export class AirtableModule {}
