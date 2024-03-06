import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}
  async createUser() {
    return 'create user from service';
  }
}
