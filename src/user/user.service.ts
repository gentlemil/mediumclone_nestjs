import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/createUser.dto';

@Injectable()
export class UserService {
  constructor() {}
  async createUser(createDto: CreateUserDto) {
    return createDto;
  }
}
