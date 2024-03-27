import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IEmployee } from '../../interfaces/employee/employee.interface';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzCardModule,
    NzAvatarModule,
    NzButtonModule,
    NzModalModule,
    NzDropDownModule,
    NzIconModule,
    NzLayoutModule,
    NzDividerModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule
  ],
  templateUrl: './employee.component.html',
  styles: ``
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employees: IEmployee[] = [];
  employeeSubscription!: Subscription;
  // public idToken!: string;
  constructor(
    private modalService: NzModalService,
    private router: Router,
    private employeeService: EmployeeService
  ) {}
  ngOnInit(): void {
    this.employeeSubscription = this.employeeService.getAllEmployee().subscribe(employees => {
      this.employees = employees;
    });
  }
  OnClickAddEmployee(): void {
    this.router.navigate(['employeeForms']);
    this.employeeService.isEditMode = false;
    // console.log(this.employeeService.isEditMode);
  }
  //Though Im getting id form the DB but to pass it to submit function Im storing it in separate variable.
  OnClickEditEmployee(id: string): void {
    this.employeeService.idToken = id;
    this.employeeService.isEditMode = true;
    this.router.navigate(['employeeForms']);
  }
  OnClickRemoveEmployee(id: string): void {
    this.employeeService.idToken = id;
    this.employeeService.deleteEmployeeById(id);
    this.employees = this.employees.filter(employee => employee.id !== this.employeeService.idToken);
    setTimeout(() => {
      this.employeeService.getAllEmployee();
    }, 1000);
  }
  OnClickGoBack() {
    this.modalService.confirm({
      nzTitle: 'Go Back !!!',
      nzContent: 'Do you want to go back',
      nzOnOk: () => {
        this.employeeService.isOkLoading = true;
        if (this.employeeService.isOkLoading == true) {
          setTimeout(() => {
            this.employeeService.isVisible = false;
            this.employeeService.isOkLoading = false;
          }, 3000);
        }
        this.router.navigateByUrl('dashboard');
      },
      nzOnCancel: () => {
        setTimeout(() => {
          this.employeeService.isVisible = false;
        }, 3000);
        this.router.navigate(['employee']);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.employeeSubscription && !this.employeeSubscription.closed) {
      this.employeeSubscription.unsubscribe();
    }
  }
  // isVisible = false;
  // isOkLoading = false;
  // currentDate = new Date();
  // constructor(
  //   private modalService: NzModalService,
  //   private router: Router,
  //   private http: HttpClient
  // ) {}
  // listOfData: IEmployee[] = [];
  // ngOnInit(): void {
  //   for (let i = 0; i < 100; i++) {
  //     this.listOfData.push({
  //       emp_id: this.listOfData.length + 1,
  //       emp_name: `Employee ${this.listOfData.length + 1}`,
  //       emp_depart: 'IT',
  //       emp_email: 'EdwardPark@gmail.com'
  //     });
  //   }
  // }
  // OnClickAddEmployee(): void {
  //   this.modalService.confirm({
  //     nzTitle: 'Add Employee',
  //     nzContent: 'Adding new Employee',
  //     nzOkText: 'Add Employee',
  //     nzOkType: 'primary',
  //     nzOnOk: () => {
  //       this.isOkLoading = true;
  //       if (this.isOkLoading == true) {
  //         setTimeout(() => {
  //           this.isVisible = false;
  //           this.isOkLoading = false;
  //         }, 3000);
  //         this.modalService.create({
  //           nzTitle: 'Add Employee',
  //           nzOkText: 'Yes',
  //           nzOnOk: () => {},
  //           nzCancelText: 'Cancel',
  //           nzOnCancel: () => {
  //             setTimeout(() => {
  //               this.isVisible = false;
  //             }, 3000);
  //             this.openModal('Not Add Employee', 'Employee was not added');
  //           }
  //         });
  //       }
  //     },
  //     nzCancelText: 'Cancel',
  //     nzOnCancel: () => {
  //       setTimeout(() => {
  //         this.isVisible = false;
  //       }, 3000);
  //       this.openModal('Not Add Employee', 'Employee was not added');
  //     }
  //   });
  // }
  // OnClickEditEmployee(): void {
  //   this.modalService.confirm({
  //     nzTitle: 'Edit Employee',
  //     nzContent: 'Edit Employee-Details',
  //     nzOkText: 'Edit Employee',
  //     nzOkType: 'primary',
  //     nzOnOk: () => {
  //       this.isOkLoading = true;
  //       if (this.isOkLoading == true) {
  //         setTimeout(() => {
  //           this.isVisible = false;
  //           this.isOkLoading = false;
  //         }, 3000);
  //         this.modalService.confirm({
  //           nzTitle: 'Confirmation!!',
  //           nzCancelText: 'Cancel',
  //           nzOnCancel: () => {
  //             setTimeout(() => {
  //               this.isVisible = false;
  //             }, 3000);
  //           }
  //         });
  //       }
  //     },
  //     nzCancelText: 'Cancel',
  //     nzOnCancel: () => {
  //       setTimeout(() => {
  //         this.isVisible = false;
  //       }, 3000);
  //       this.openModal('Not Edited', 'Employee was not Edited');
  //     }
  //   });
  // }
  // OnClickRemoveEmployee(): void {
  //   this.modalService.confirm({
  //     nzTitle: 'Remove',
  //     nzContent: 'Employee wants to remove',
  //     nzOnOk: () => {
  //       this.isOkLoading = true;
  //       if (this.isOkLoading == true) {
  //         setTimeout(() => {
  //           this.isVisible = false;
  //           this.isOkLoading = false;
  //         }, 3000);
  //         this.openModal('Remove User', 'Removed a user detail.');
  //       }
  //     },
  //     nzOnCancel: () => {
  //       setTimeout(() => {
  //         this.isVisible = false;
  //       }, 3000);
  //       this.openModal('Not Remove', 'Employee is not removed.');
  //     }
  //   });

  //   console.log('Remove Employee clicked');
  // }

  // private openModal(title: string, content: string): void {
  //   this.modalService.info({
  //     nzTitle: title,
  //     nzContent: content,
  //     nzOnOk: () => {
  //       this.isOkLoading = true;
  //       setTimeout(() => {
  //         this.isVisible = false;
  //         this.isOkLoading = false;
  //       }, 3000);
  //     }
  //   });
  // }
  // submitForm(data: any): void {
  //   console.log('Form data:', data);
  // }
  // OnClickGoBack() {
  //   this.modalService.confirm({
  //     nzTitle: 'GoBack',
  //     nzContent: 'Employee wants to go back',
  //     nzOnOk: () => {
  //       this.isOkLoading = true;
  //       if (this.isOkLoading == true) {
  //         setTimeout(() => {
  //           this.isVisible = false;
  //           this.isOkLoading = false;
  //         }, 3000);
  //         this.openModal('Go Back', 'Do you want to go back!!');
  //       }
  //       this.router.navigateByUrl('dashboard');
  //     },

  //     nzOnCancel: () => {
  //       setTimeout(() => {
  //         this.isVisible = false;
  //       }, 3000);
  //     }
  //   });
  // }
}
