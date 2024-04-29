
export type User = {
  firstname: string;
  lastname: string;
  locationTimezone: string;
  birthday: string;
  birthDateKey?: string;
};

export type UserEditInterface = {
  firstname?: string;
  lastname?: string;
  locationTimezone?: string;
  birthday?: string;
};