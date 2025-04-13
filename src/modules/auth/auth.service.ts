import { Injectable } from '@nestjs/common';
import { CriteriaService } from '../criteria/criteria.service';
import { UserPayload } from '../../auth/jwt.service';

@Injectable()
export class AuthService {
  constructor(private readonly criteriaService: CriteriaService) {}

  async initData(user: UserPayload) {
    // Kiểm tra xem user đã có dữ liệu chưa
    const existingCriteria = await this.criteriaService.getCriteriaById(user.id);
    
    if (existingCriteria && existingCriteria.length > 0) {
      // Nếu đã có dữ liệu, trả về tất cả criteria
      return {
        message: 'User data already exists',
        data: existingCriteria
      };
    }

    // Nếu chưa có dữ liệu, tạo mới
    const newCriteria = await this.criteriaService.createDefaultCriteria(user.id);
    
    return {
      message: 'New user data initialized',
      data: newCriteria
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