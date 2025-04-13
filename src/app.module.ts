import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AirtableModule } from './modules/airtable.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CriteriaModule } from './modules/criteria/criteria.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AirtableModule,
    AuthModule,
    CriteriaModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
