import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EmployeeService } from '../../services/employee/employee.service';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { DepartmentService } from '../../services/employee/department.service';
import { Subscription } from 'rxjs';
import { IDepartment, MyObject } from '../../interfaces/department/department.interface';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-employee-forms',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzCardModule,
    NzButtonModule,
    NzLayoutModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzSelectComponent,
    NzOptionComponent
  ],
  templateUrl: './employee-forms.component.html',
  styles: ``
})
export class EmployeeFormsComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.resetForm();
    this.getAllDepartment();
  }
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private departmentService: DepartmentService,
    private modalService: NzModalService
  ) {
    this.validateForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      status: ['false']
    });
  }
  isConfirmLoading = this.employeeService.isConfirmLoading;
  isEditMode = this.employeeService.isEditMode;
  idToken = this.employeeService.idToken;
  departmentSubscription!: Subscription;
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('Form is called:', this.validateForm);
      const userInput = this.validateForm.value;
      const employeeData = {
        fname: userInput.fname,
        lname: userInput.lname,
        email: userInput.email,
        phone: userInput.phone,
        departmentId: userInput.departmentId,
        status: userInput.status
      };
      if (this.isEditMode) {
        if (this.idToken) {
          console.log(this.idToken);
        }
        this.employeeService.updateEmployee(this.idToken, employeeData).subscribe({
          next: response => {
            console.log(`Employee updated: id:${response.id}`);
          },
          error: err => {
            console.error('Error updating employee:', err);
          }
        });
      } else {
        this.employeeService.createEmployee(employeeData).subscribe({
          next: response => {
            console.log(`employee created: id:${response.id}`);
          },
          error: err => {
            console.error('Error creating employee:', err);
          }
        });
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  handleOk(): void {
    if (!this.validateForm.valid) {
      this.router.navigate(['employeeForms']);
    }
    this.isConfirmLoading = true;
    this.submitForm();
    if (this.isEditMode) {
      this.modalService.info({
        nzTitle:'Editing Employee Details', 
        nzContent:'Employee Details is Edited',
        nzOnOk: () =>{
          this.employeeService.getAllEmployee();
          this.router.navigate(['employee']);
          this.isConfirmLoading = false;
        }
      });
    } else {
      this.modalService.info({
        nzTitle: 'Adding Employee', 
        nzContent: 'New Employee is added',
        nzOnOk: () =>{
          this.employeeService.getAllEmployee();
          this.router.navigate(['employee']);
          this.isConfirmLoading = false;
        }
      });
    }
  }
  resetForm(): void {
    this.validateForm.reset();
  }
  departmentIdList!: IDepartment;
  valueDepartment: MyObject[] = [];
  getAllDepartment() {
    this.departmentSubscription = this.departmentService.getAllDepartment().subscribe(departments => {
      departments.forEach(element => {
        this.departmentIdList = element;
        this.valueDepartment.push({ value: this.departmentIdList.id, label: this.departmentIdList.name });
      });
    });
  }
  log(value: { label: string; value: string }): void {
    console.log(value);
  }
  ngOnDestroy(): void {
    this.departmentSubscription.unsubscribe();
  }
}
