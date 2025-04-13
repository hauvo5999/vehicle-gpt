import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AirtableModule } from './modules/airtable.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CriteriaModule } from './modules/criteria/criteria.module';
import { ChatModule } from './modules/chat/chat.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtHelper } from './auth/jwt.service';

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
  providers: [AppService, JwtHelper],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
