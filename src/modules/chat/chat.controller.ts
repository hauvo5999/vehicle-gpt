import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getAllChats() {
    return this.chatService.getAllChats();
  }

  @Get(':id')
  async getChatById(@Param('id') id: string) {
    return this.chatService.getChatById(id);
  }

  @Post()
  async createChat(@Body() chatDto: any) {
    return this.chatService.createChat(chatDto);
  }

  @Post(':id/message')
  async sendMessage(@Param('id') id: string, @Body() messageDto: any) {
    return this.chatService.sendMessage(id, messageDto);
  }
} 