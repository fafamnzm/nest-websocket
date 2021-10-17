import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  login(@Body() body: LoginDto): Promise<string> {
    return this.appService.login(body);
  }
}
