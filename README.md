# Birthday Scheduler



## Approach

This app uses bullmq which is built on top of redis, we have used its persistent scheduled repeatable jobs which schedules job based on cron pattern it recieves and queues it up to be processed.
We have used cronjob for recovery jobs, which are again queued up to be processed.

