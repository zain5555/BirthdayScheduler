import { Module } from '@nestjs/common';
import { UsersModule } from './users';
import { QueueHandlerModule } from './queue-handler';
import { CronTasksModule } from './cron-tasks';
import { BirthdayStatusModule } from './birthday-status';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { SchemaModule } from './schema/schema.module';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODBURL || "", { dbName: process.env.MONGODB }),
    SchemaModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: process.env.BULLHOST,
        port: parseInt(process.env.BULLPORT || "6379"),
      },
    }), 
    BirthdayStatusModule,
    CronTasksModule,
    UsersModule,
    QueueHandlerModule
    ],
  controllers: [AppController],
})
export class AppModule {}
