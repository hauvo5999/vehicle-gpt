import { Injectable } from '@nestjs/common';
import { verifyToken } from '@clerk/clerk-sdk-node';
import * as dotenv from 'dotenv';

dotenv.config();

export interface UserPayload {
  id: string;
  email: string;
  role?: string;
  orgId?: string;
}

@Injectable()
export class JwtHelper {
  // constructor(private userService: UserService) {}

  async verifyClerkToken(token: string): Promise<UserPayload | null> {
    try {
      // Xác thực token bằng Clerk SDK
      const verifiedToken = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      if (!verifiedToken) {
        return null;
      }

      // Mapping từ token Clerk sang user payload
      const email =
        typeof verifiedToken.email === 'string'
          ? verifiedToken.email
          : (verifiedToken.sub as string) || 'unknown@example.com';

      // Kiểm tra chặt chẽ nếu orgId là null hoặc undefined
      const orgId =
        verifiedToken.orgId === null || verifiedToken.orgId === undefined
          ? 'default'
          : (verifiedToken.orgId as string);

      return {
        id: verifiedToken.sub as string,
        email,
        orgId,
      };
    } catch (error) {
      console.error('Error verifying Clerk token:', error.message);
      return null;
    }
  }
}
