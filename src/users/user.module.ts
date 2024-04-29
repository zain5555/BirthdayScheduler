import { Module } from '@nestjs/common';
import { UsersController } from './http';
import { UserService } from './domain';
import { BullModule } from '@nestjs/bullmq';
import { queueBirthday } from '../lib/lib.constants';

@Module({
  imports: [
    BullModule.registerQueue({
        name: queueBirthday,
    }),
],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService,],
})
export class UsersModule {}
