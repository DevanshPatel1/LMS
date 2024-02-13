import { Injectable } from '@angular/core';
import { IUser } from './user.interface'; // import your IUser interface

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private data!: IUser;

  setData(data: IUser) {
    this.data = data;
    console.log("setData: ",data);
  }

  getData(): IUser {
    return this.data;
  }
}
