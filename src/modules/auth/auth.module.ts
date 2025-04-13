import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtHelper } from '../../auth/jwt.service';
import { CriteriaModule } from '../criteria/criteria.module';

@Module({
  imports: [CriteriaModule],
  controllers: [AuthController],
  providers: [AuthService, JwtHelper],
  exports: [AuthService, JwtHelper],
})
export class AuthModule {} 