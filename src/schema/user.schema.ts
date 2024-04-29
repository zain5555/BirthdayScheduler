import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    locationTimezone: { type: String, required: true },
    birthday: { type: String, required: true },
    birthDateKey: { type: String, required: true },

  }, {
    timestamps: true,
  },
);

export interface UserInterface {
    _id?: string,
    firstname: string;
    lastname: string;
    locationTimezone: string;
    birthday: String;
    birthDateKey?:String;
}
  
