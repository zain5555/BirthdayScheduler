import { Module } from '@nestjs/common';
import { QueueHandlerService } from './queue-handler.service';
import { BirthdayStatusModule } from '../birthday-status/index';


@Module({
  imports: [
    BirthdayStatusModule
  ],
  providers: [QueueHandlerService],
  exports: [QueueHandlerService],
})
export class QueueHandlerModule {}
