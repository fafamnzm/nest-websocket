import { io } from 'socket.io-client';
import { INestApplication } from '@nestjs/common';

export const getClientWebsocketForAppAndNamespace = (
  app: INestApplication,
  namespace?: string,
  query?: object,
) => {
  const httpServer = app.getHttpServer();
  // if (!httpServer.address()) {
  //   httpServer.listen(0);
  // }
  return io(`ws://localhost:${httpServer.address().port}`, {
    transports: ['websocket', 'polling', 'flashsocket'],
  });
};
