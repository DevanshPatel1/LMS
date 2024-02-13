import { Injectable, inject } from '@angular/core';
import { IEmployee } from './employee.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  http = inject(HttpClient);
  private data!: IEmployee;

  setData(data: IEmployee) {
    this.data = data;
    console.log('setData: ', data);
  }

  getData(): IEmployee {
    return this.data;
  }
}
