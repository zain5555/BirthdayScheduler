import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { axiosPostRequest } from '../lib/axios.functions';
import { BirthdayStatusInterface  } from '../schema/birthdayStatus.schema';
import { birthdayStatusRecordInterface  } from './index';
import { User  } from '../users/domain/index';




export class BirthdayStatusService {
  constructor(
    @InjectModel('BirthdayStatus') private readonly birthdayStatusModel: Model<BirthdayStatusInterface>,
){}

async addStatus(record: BirthdayStatusInterface): Promise<Boolean> {
  try {
    const docs = await this.birthdayStatusModel.create(record);
    return true;
  } catch (error) {
    throw error;
  }
}

async getStatusByQuery(query: any): Promise<BirthdayStatusInterface[]> {
  try {
    const docs = await this.birthdayStatusModel.find(query);
    return docs;
  } catch (error) {
    throw error;
  }
}

async getStatusByQueryForOne(query: any): Promise<any> {
  try {
    const doc = await this.birthdayStatusModel.findOne(query);
    return doc;
  } catch (error) {
    return error;
  }
}

async processApiRequestAndStatusUpdate(birthdayStatusRecord: birthdayStatusRecordInterface, jobData: User): Promise<any> {

  let birthdayStatusCheck = await this.getStatusByQueryForOne(birthdayStatusRecord);

  if(!birthdayStatusCheck){
   
    try {

      let message = `Hey, ${jobData?.firstname + jobData?.lastname} it is your birthday`;
      let reqBody = {
        message
      }

      let reqForBirthdayWish = await axiosPostRequest(`${process.env.BEEKEEPERBASEURL}/birthday`, reqBody);

      if(reqForBirthdayWish?.data?.completed){

        for(let i=0; i<3;i++){
          try {
            let birthdayStatusDBCall = await this.addStatus(birthdayStatusRecord);
            if (birthdayStatusDBCall) break;
          } catch (error) {
            continue;
          }
        }
        
      }
      
    } catch (error) {
      throw Error;
    }
    
  }


}

}
