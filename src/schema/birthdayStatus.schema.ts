import * as mongoose from 'mongoose';
import { birthdayStatusEnum } from '../lib/lib.constants';

export const BirthdayStatusSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    status: {
      type: String,
      enum: birthdayStatusEnum,
      default: "pending",
    },
  }, {
    timestamps: true,
  },
);

export interface BirthdayStatusInterface {
    _id?: string,
    user:string,
    date: string;
    status: string;
}
  
