import { ForbiddenException, Injectable } from '@nestjs/common';

import { LoginDto } from './app.dto';
import {
  findUser,
  validatePassword,
  generateToken,
  validateEmail,
} from './app.middlewares';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async login(body: LoginDto): Promise<string> {
    try {
      const email = body.email;
      const password = body.password;

      const checkEmail = validateEmail(email);
      if (!checkEmail) throw new ForbiddenException('Invalid credentials');

      const user = findUser(email);
      if (!user) throw new ForbiddenException('Invalid credentials');

      const checkPassword = await validatePassword(password, user);
      if (!checkPassword) throw new ForbiddenException('Invalid credentials');

      const token = generateToken(user);
      return token;
    } catch (err) {
      throw err;
    }
  }
}
