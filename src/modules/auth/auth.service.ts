import { Injectable } from '@nestjs/common';
import { CriteriaService } from '../criteria/criteria.service';
import { UserPayload } from '../../auth/jwt.service';
import { AirtableService } from '../airtable/airtable.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly criteriaService: CriteriaService,
    private readonly airtableService: AirtableService,
  ) {}

  async initData(user: UserPayload) {
    //TODO: implement later
    // Kiểm tra xem user đã có dữ liệu chưa
    const existingUsers = await this.airtableService.findMany('user', {email: user.email});
    if (existingUsers.records.length == 0) {
      // Create new user
      await this.airtableService.create('user', { email: user.email });
    }
    const existingCriteria = await this.criteriaService.getCriteriaConfigByEmail(user.email);
    
    if (existingCriteria && existingCriteria.records.length > 0) {
      // Nếu đã có dữ liệu, trả về tất cả criteria
      return {
        message: 'Config already exists',
        isInitConfig: true,
      };
    }

    return {
      message: 'New user data initialized, user should be redirected to criteria config',
      isInitConfig: false,
    };
  }

  async login(loginDto: any) {
    // Implement login logic here
    return { message: 'Login successful' };
  }

  async register(registerDto: any) {
    // Implement registration logic here
    return { message: 'Registration successful' };
  }
}
