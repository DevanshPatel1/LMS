import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDepartment } from '../../interfaces/department/department.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getAllDepartment() {
    return this.http.get<IDepartment[]>(`${this.apiUrl}department`);
  }
}
