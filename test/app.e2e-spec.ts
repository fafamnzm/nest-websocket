import { Test } from '@nestjs/testing';
import { Utils } from './middlewares/utils';
import { AppModule } from '../src/app.module';
import { SocketService } from './middlewares/socket.service';
import { observe } from 'rxjs-marbles/jest';
import { tap, take } from 'rxjs/operators';

describe('Events', () => {
  let socket: SocketService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    await Utils.startServer(testingModule);
    //? each test need a new socket connection
    socket = await Utils.createSocket();
  });

  afterEach(async () => {
    //? each test need to release the connection for next
    await Utils.closeApp();
  });

  describe('should return a correct event using observe', () => {
    it(
      'when socket is connected',
      observe(() =>
        socket.once('connect').pipe(
          tap(() => {
            expect(true).toBeTruthy();
          }),
        ),
      ),
    );

    it(
      'when socket send normal data',
      observe(() => {
        socket
          .once('connect')
          .pipe(tap(() => socket.emit('message', 'test')))
          .subscribe();

        return socket.on('message').pipe(
          take(1),
          tap((data) => {
            expect(data?.data).toMatch('Client Connected');
          }),
        );
      }),
    );
  });

  describe('should return a correct event using toPromise', () => {
    it('when socket is connected', () => {
      return socket
        .once('connect')
        .pipe(tap(() => expect(true).toBeTruthy()))
        .toPromise();
    });
  });
});
