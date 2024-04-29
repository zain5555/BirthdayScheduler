import { Module } from '@nestjs/common';
import { BirthdayStatusService } from './birthday-status.service';

@Module({
  imports: [
  ],
  providers: [BirthdayStatusService],
  exports: [BirthdayStatusService],
})
export class BirthdayStatusModule {}
