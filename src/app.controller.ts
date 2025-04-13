import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AirtableRecord } from './interfaces/airtable.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
