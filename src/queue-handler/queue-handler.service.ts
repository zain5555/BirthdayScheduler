import { Inject, Injectable } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { convertCurrentDateForBirthdayStatus } from '../lib/lib.functions'
import { BirthdayStatusService } from '../birthday-status/birthday-status.service'
import { birthdayStatusEnumConstants, queueBirthday, queueAltBirthday } from '../lib/lib.constants';
import { User } from '../users/domain/index';




@Processor(queueBirthday)
@Processor(queueAltBirthday)

@Injectable()
export class QueueHandlerService extends WorkerHost {
  constructor(
    @Inject(BirthdayStatusService)
    private readonly birthdayStatusService: BirthdayStatusService){
    super();
  }

  async process(job: Job<User>): Promise<boolean> {

    let jobName = job.name;
    let jobData = job.data;
    let birthdayStatusRecord = {
      user : jobName,
      status: birthdayStatusEnumConstants.completed,
      date: await convertCurrentDateForBirthdayStatus()
    }

    try {
      await this.birthdayStatusService.processApiRequestAndStatusUpdate(birthdayStatusRecord, jobData)
    } catch (error) {
      throw Error;
    }

    return true;
  }
}
