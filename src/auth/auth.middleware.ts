import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtHelper } from './jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtHelper: JwtHelper) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'Unauthorized - No token provided',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized - Invalid token format',
      });
    }

    try {
      const user = await this.jwtHelper.verifyClerkToken(token);
      if (!user) {
        return res.status(401).json({
          message: 'Unauthorized - Invalid token',
        });
      }

      // Attach user to request for use in controllers      
      req['user'] = user;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Unauthorized - Token verification failed',
      });
    }
  }
} 