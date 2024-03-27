import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ICustomer } from '../../interfaces/customer/customer.interface';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/';
  public isVisible!: false;
  public isEditMode!: boolean;
  public isConfirmLoading!: boolean;
  public isOkLoading!: boolean;
  public customers: ICustomer[] = [];
  public idToken!: string;
  idSubscription!: Subscription 
  constructor(
    private http: HttpClient
  ) {}
  createCustomer(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}customer`, body);
  }
  updateCustomer(id: string, body: any): Observable<any> {
    if (id) {
      console.log(id, 'qqqqqqqqqqqqqqqqqqqqqqqqqq');
      if (body) {
        console.log(body, 'wwwwwwwwwwwwwwwwwww');
      }
    }
    return this.http.patch(`${this.apiUrl}customer/${id}`, body);
  }
  getCustomerById(id: string) {
    console.log('ID: ', id);
    return this.http.get(`${this.apiUrl}customer/${id}`);
  }
  getAllCustomer() {
    return this.http.get<ICustomer[]>(`${this.apiUrl}customer`);
  }
  deleteCustomerById(id: string) {
    console.log('Removed Customer Data by ID: ', id);
    this.http.delete(`${this.apiUrl}customer/${id}`).subscribe(customers => {
      this.customers = this.customers.filter(customer => customer.id !== this.idToken);
    });
    setTimeout(() => {
      this.getAllCustomer();
    }, 1000);
  }
}
