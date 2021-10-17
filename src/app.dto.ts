export class UserDto {
  id: string;
  email: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class ChatDto {
  [x: number]: string;
}
