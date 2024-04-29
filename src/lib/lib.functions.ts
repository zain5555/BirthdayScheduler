export const convertDateToCronPatternForBirthday = async (birthdayDate: string): Promise<string> => {
    let date = new Date(birthdayDate);
    
    let month = date.getMonth() + 1;
    
    let dayOfWeek = date.getDate();

    let result = "0 9 " + dayOfWeek + " " + month + " *" 

    return result;
}


export const convertDateToKeyForBirthday = async (birthdayDate?: string): Promise<string> => {
    let date;
    birthdayDate ? date = new Date(birthdayDate) : date = new Date();
    
    let month = date.getMonth() + 1;
    
    let dayOfWeek = date.getDate();

    let result = dayOfWeek + "-" + month;

    return result;
}

export const convertCurrentDateForBirthdayStatus = async (): Promise<string> => {
    let date = new Date();
    
    let month = date.getMonth() + 1;
    
    let dayOfWeek = date.getDate();

    let year = date.getFullYear();


    let result = dayOfWeek + "-" + month + "-" + year;

    return result;
}