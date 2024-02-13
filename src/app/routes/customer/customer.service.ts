import { Injectable } from '@angular/core';
import { ICustomer } from './customer.interface'
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private data!: ICustomer;

  setData(data: ICustomer) {
    this.data = data;
    console.log("setData: ",data);
  }

  getData(): ICustomer {
    return this.data;
  }
}
