export const queueBirthday = "birthdayQueue";
export const queueAltBirthday = "birthdayAltQueue";
export const birthdayStatusEnum = ["pending", "completed"];
export const birthdayStatusEnumConstants = {
    pending:"pending",
    completed:"completed"
};
export const queueJobOptions = {
    repeat: 3,
    backoff: {
        type: 'exponential',
        delay: 1000,
    },
};


