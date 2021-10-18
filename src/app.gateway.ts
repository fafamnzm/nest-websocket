import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatDto } from './app.dto';

export const chats: Array<ChatDto> = [];

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: { data: string },
    @ConnectedSocket() socket,
  ): void {
    chats.push({ [socket.client.id]: message.data });
    this.server.emit('message', message);
  }

  afterInit(server: Server) {
    this.logger.log(`websocket server Init!`);
  }

  handleDisconnect(client: Socket) {
    // this.logger.log(`Client disconnected: ${client.id}`);
    this.server.emit('message', { data: `Client disconnected: ${client.id}` });
  }

  handleConnection(client: Socket, ...args: any[]) {
    // this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('message', { data: `Client Connected: ${client.id}` });
    if (chats?.length > 0)
      this.server.to(client.id).emit('message', { data: chats });
  }
}
