import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { UserDto } from './app.dto';

//? Mock users from db
const users: Array<UserDto> = [];

//? Validate entered email
export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

//? Find User from db
export const findUser = (email: string): UserDto => {
  return users.find((user) => user.email === email);
};

//? To validate the entered password
export const validatePassword = (password: string | Buffer, user: UserDto) => {
  return bcrypt.compare(password, user.password);
};

//? To generate a token
export const generateToken = (user: UserDto) => {
  return jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
};
