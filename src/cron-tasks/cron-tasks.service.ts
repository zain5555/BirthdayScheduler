import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bull';

import { BirthdayStatusService } from '../birthday-status/birthday-status.service';
import { convertDateToKeyForBirthday } from '../lib/lib.functions';
import { queueAltBirthday } from '../lib/lib.constants';


@Injectable()
export class CronTasksService {
  constructor(
    @InjectQueue(queueAltBirthday) private queueService: Queue, 
    @Inject(BirthdayStatusService)
    private readonly birthdayStatusService: BirthdayStatusService
  ){}
  private readonly logger = new Logger(CronTasksService.name);


  @Cron('0 23 * * *')
  async handleCron() {

    let birthDateKey = await convertDateToKeyForBirthday();

    let birthdayStatusRecords = await this.birthdayStatusService.getStatusByQuery({birthDateKey})

    for(let i=0; i < birthdayStatusRecords.length; i++){
      let currentRecord = birthdayStatusRecords[i];

      await this.queueService.add(
        currentRecord.user.toString(),
        currentRecord,
      );

    }

    this.logger.log('Daily Cron.');
  }
}
