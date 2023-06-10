import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {userProviders} from "./user.providers";
import {UserController} from "./user.controller";

@Module({
  controllers: [
      UserController,
  ],
  providers: [
      UserService,
      ...userProviders,
  ]
})
export class UserModule {}
