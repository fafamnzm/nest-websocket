import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { INestApplication } from '@nestjs/common/interfaces';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { SocketService } from './socket.service';
import { AppModule } from '../../src/app.module';

export class Utils {
  public static socket: SocketService;
  private static server: express.Express;
  private static app: INestApplication;
  private static module: TestingModule;

  public static async startServer(testingModule: TestingModule) {
    this.module = testingModule;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    this.app = moduleFixture.createNestApplication();
    await this.app.init();
  }

  public static async createSocket(defer: boolean = false) {
    await this.app.listen(3001);
    this.socket = new SocketService(defer);

    return this.socket;
  }
  public static async closeApp() {
    this.socket.close();
    await this.app.close();
  }
}
