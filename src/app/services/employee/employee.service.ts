import { Injectable } from '@angular/core';
import { IEmployee } from '../../interfaces/employee/employee.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/';
  public isVisible!: boolean;
  public isEditMode!: boolean;
  public isConfirmLoading!: boolean;
  public isOkLoading!: boolean;
  public employees: IEmployee[] = [];
  public idToken!: string;
  constructor(
    private http: HttpClient,
    private modalService: NzModalService
  ) {}
  createEmployee(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}employee`, body);
  }
  updateEmployee(id: string, body: any): Observable<any> {
    if (id) {
      console.log(id);
      if (body) {
        console.log(body);
      }
    }
    return this.http.patch(`${this.apiUrl}employee/${id}`, body);
  }
  getEmployeeById(id: string) {
    console.log('ID: ', id);
    return this.http.get(`${this.apiUrl}employee/${id}`);
  }
  getAllEmployee() {
    return this.http.get<IEmployee[]>(`${this.apiUrl}employee`);
  }
  deleteEmployeeById(id: string) {
    console.log('Removed Employee Data by ID: ', id);
    this.http.delete(`${this.apiUrl}employee/${id}`).subscribe(employees => {
      this.employees = this.employees.filter(employee => employee.id !== this.idToken);
    });
    setTimeout(() => {
      this.getAllEmployee();
    }, 1000);
  }
  openModal(title: string, content: string): void {
    this.modalService.info({
      nzTitle: title,
      nzContent: content,
      nzOnOk: () => {
        this.isOkLoading = true;
        setTimeout(() => {
          this.isVisible = false;
          this.isOkLoading = false;
        }, 3000);
      }
    });
  }
}
