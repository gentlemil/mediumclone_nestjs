import { UserService } from '@app/user/user.service';
import { Module } from '@nestjs/common';
import { UserController } from '@app/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { FileService } from '@app/file/file.service';
import FileEntity from '@app/file/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FileEntity])],
  controllers: [UserController],
  providers: [UserService, FileService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
