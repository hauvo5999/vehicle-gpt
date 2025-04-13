import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  async sendMessage(message: string, email: string) {
    //TODO: implement later
    return { message: 'Message response' };
  }
} 