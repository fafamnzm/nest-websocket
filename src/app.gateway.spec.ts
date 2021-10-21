import { Test, TestingModule } from '@nestjs/testing';
import { AppGateway } from './app.gateway';

describe('AppGateway', () => {
  let gateway: AppGateway;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppGateway],
    }).compile();

    gateway = module.get<AppGateway>(AppGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
    expect(gateway.server).toBeDefined();
    expect(gateway.afterInit).toBeDefined();
    expect(gateway.handleMessage).toBeDefined();
    expect(gateway.handleConnection).toBeDefined();
    expect(gateway.handleDisconnect).toBeDefined();
  });
});
