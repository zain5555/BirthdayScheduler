# Birthday Scheduler



## Approach

This app is built in nestjs and we are using mongoDb for persistent storage.
This app uses bullmq which is built on top of redis, we have used its persistent scheduled repeatable jobs which schedules job based on cron pattern it recieves and queues it up to be processed.
We have used cronjob for recovery jobs ehich triggered at day end, which are again queued up to be processed.
We are using beeceptor to send birthday Api calls to.

