export interface IUser {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  status: boolean;
  role: string;
  gender: string;
  active: boolean;
  countryCode: string;
}


export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Employee = 'EMPLOYEE',
  Customer = 'CUSTOMER'
}
