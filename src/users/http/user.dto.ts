export type UserDto = {
    firstname: string;
    lastname: string;
    locationTimezone: string;
    birthday: string;
  };
  
  export type UserEditDto = {
    firstname?: string;
    lastname?: string;
    locationTimezone?: string;
    birthday?: string;
  };