import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { queueAltBirthday } from '../lib/lib.constants';
import { BirthdayStatusModule } from '../birthday-status/birthday-status.module';
import { CronTasksService } from './cron-tasks.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BirthdayStatusModule,
    BullModule.registerQueue({
      name: queueAltBirthday,
  }),
  ],
  providers: [CronTasksService],
  exports: [CronTasksService],
})
export class CronTasksModule {}
