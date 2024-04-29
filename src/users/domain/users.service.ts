import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectModel } from '@nestjs/mongoose';
import { InjectQueue } from '@nestjs/bullmq';
import { Model } from 'mongoose';

import { convertDateToCronPatternForBirthday, convertDateToKeyForBirthday } from '../../lib/lib.functions';
import { queueJobOptions } from '../../lib/lib.constants';
import { UserInterface } from '../../schema/user.schema';
import { User } from './index'
import { queueBirthday } from '../../lib/lib.constants';


@Injectable()
export class UserService {
    constructor(
        @InjectQueue(queueBirthday) private queueService: Queue,
        @InjectModel('User') private readonly userModel: Model<UserInterface>,       
    ){}

    async getUsersByQuery(query: any): Promise<any> {
        try {
          const docs = await this.userModel.find(query);
          return docs;
        } catch (error) {
          return error;
        }
      }

   async addUser(user: User): Promise<UserInterface> {

        try {
        
        user.birthDateKey = await convertDateToKeyForBirthday(user.birthday);
        const doc = await this.userModel.create(user);

        let repeatParamsForJob = {
            cron: await convertDateToCronPatternForBirthday(user.birthday),
            tz: user.locationTimezone
        }

        await this.queueService.add(
            doc._id.toString(),
            doc,
            {
                repeat: repeatParamsForJob,
                attempts: queueJobOptions.repeat,
                backoff: queueJobOptions.backoff
            },
          );     
          
        let result = {
            __id : doc._id,
            firstname : doc.firstname,
            lastname : doc.lastname,
            locationTimezone: doc.locationTimezone,
            birthday: doc.birthday
        }
          
        return result       
        } catch (error) {
            throw BadRequestException;
        }

    }
    async deleteUser(id: string): Promise<Boolean> {

        const record = await this.userModel.findOne({_id: id})

        if(record){
            let cronPatternForBirthday = await convertDateToCronPatternForBirthday(record.birthday.toString());
            let jobKey = record?._id.toString() + ":::" + record?.locationTimezone + ":" + cronPatternForBirthday;
            await this.queueService.removeRepeatableByKey(jobKey);
            const docs = await this.userModel.deleteOne({ _id: id})
            return true;
        }

        else {
            throw BadRequestException;
        }

    }

    async editUser(id: string, userUpdate: User): Promise<Boolean> {

        const record = await this.userModel.findOne({_id: id})

        if(record){
            let cronPatternForBirthday = await convertDateToCronPatternForBirthday(record.birthday.toString());
            let jobKey = record?._id.toString() + ":::" + record?.locationTimezone + ":" + cronPatternForBirthday;

            await this.queueService.removeRepeatableByKey(jobKey);

            const docsUpdated = await this.userModel.findOneAndUpdate({ _id: id }, userUpdate, { new:true });

            if(docsUpdated){

                let repeatParamsForJob = {
                    cron: await convertDateToCronPatternForBirthday(docsUpdated.birthday.toString()),
                    tz: docsUpdated.locationTimezone
                }
        
                await this.queueService.add(
                    docsUpdated._id.toString(),
                    docsUpdated,
                    {
                        repeat: repeatParamsForJob,
                        attempts: queueJobOptions.repeat,
                        backoff: queueJobOptions.backoff
                    },
                  );

            }

            return true;
        }

        else {
            throw BadRequestException;
        }

    }


}
