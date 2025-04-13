import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserPayload } from 'src/auth/jwt.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async sendMessage(
    @Body() chatDto: any,
    @CurrentUser() user: UserPayload
  ) {

    console.log("user", user)

    return this.chatService.sendMessage(chatDto.message, user.email);
  }
}
