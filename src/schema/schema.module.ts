import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { BirthdayStatusSchema } from './birthdayStatus.schema';


const schemaArray = [
  MongooseModule.forFeature([
    {
      name: 'User',
      schema: UserSchema,
      collection: 'users',
    },
    {
      name: 'BirthdayStatus',
      schema: BirthdayStatusSchema,
      collection: 'birthday-status',
    },
  ]),
];

@Global()
@Module({
  imports: schemaArray,
  exports: schemaArray,
})
export class SchemaModule {
  static forRoot(): DynamicModule {
    return {
      module: SchemaModule,
      exports: schemaArray,
    };
  }
}
