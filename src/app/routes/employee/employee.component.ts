import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderModule } from '@delon/abc/page-header';
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
import { IEmployee } from './employee.interface';
import { EmployeeService } from './employee.service';
import { EmployeeFormsComponent } from '../employee-forms/employee-forms.component';
import { HttpClient } from '@angular/common/http';

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
    PageHeaderModule
  ],
  templateUrl: './employee.component.html',
  styles: ``
})
export class EmployeeComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  currentDate = new Date();
  constructor(
    private modalService: NzModalService,
    private router: Router,
    private empService: EmployeeService,
    private http: HttpClient,
  ) {}
  listOfData: IEmployee[] = [];
  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        emp_id: this.listOfData.length + 1,
        emp_name: `Employee ${this.listOfData.length + 1}`,
        emp_depart: 'IT',
        emp_email: 'EdwardPark@gmail.com'
      });
    }
  }
  OnClickAddEmployee(): void {
    this.modalService.confirm({
      nzTitle: 'Add Employee',
      nzContent: 'Adding new Employee',
      nzOkText: 'Add Employee',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.isOkLoading = true;
        if (this.isOkLoading == true) {
          setTimeout(() => {
            this.isVisible = false;
            this.isOkLoading = false;
          }, 3000);
          this.modalService.create({
            nzTitle: 'Add Employee',
            nzContent: EmployeeFormsComponent,
            nzOkText: 'Yes',
            nzOnOk: () => {
              const data = this.empService.getData();
              console.log(data)
              this.listOfData.push(data)
            },
            nzCancelText: 'Cancel',
            nzOnCancel: () => {
              setTimeout(() => {
                this.isVisible = false;
              }, 3000);
              this.openModal('Not Add Employee', 'Employee was not added');
            }
          });
        }
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => {
        setTimeout(() => {
          this.isVisible = false;
        }, 3000);
        this.openModal('Not Add Employee', 'Employee was not added');
      }
    });
  }
  OnClickEditEmployee(): void {
    this.modalService.confirm({
      nzTitle: 'Edit Employee',
      nzContent: 'Edit Employee-Details',
      nzOkText: 'Edit Employee',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.isOkLoading = true;
        if (this.isOkLoading == true) {
          setTimeout(() => {
            this.isVisible = false;
            this.isOkLoading = false;
          }, 3000);
          this.modalService.confirm({
            nzTitle: 'Confirmation!!',
            nzContent: EmployeeFormsComponent,
            nzCancelText: 'Cancel',
            nzOnCancel: () => {
              setTimeout(() => {
                this.isVisible = false;
              }, 3000);
            }
          });
        }
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => {
        setTimeout(() => {
          this.isVisible = false;
        }, 3000);
        this.openModal('Not Edited', 'Employee was not Edited');
      }
    });
  }
  OnClickRemoveEmployee(): void {
    this.modalService.confirm({
      nzTitle: 'Remove',
      nzContent: 'Employee wants to remove',
      nzOnOk: () => {
        this.isOkLoading = true;
        if (this.isOkLoading == true) {
          setTimeout(() => {
            this.isVisible = false;
            this.isOkLoading = false;
          }, 3000);
          this.openModal('Remove User', 'Removed a user detail.');
        }
      },
      nzOnCancel: () => {
        setTimeout(() => {
          this.isVisible = false;
        }, 3000);
        this.openModal('Not Remove', 'Employee is not removed.');
      }
    });

    console.log('Remove Employee clicked');
  }

  private openModal(title: string, content: string): void {
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
  submitForm(data: any): void {
    console.log('Form data:', data);
  }
  OnClickGoBack() {
    this.modalService.confirm({
      nzTitle: 'GoBack',
      nzContent: 'Employee wants to go back',
      nzOnOk: () => {
        this.isOkLoading = true;
        if (this.isOkLoading == true) {
          setTimeout(() => {
            this.isVisible = false;
            this.isOkLoading = false;
          }, 3000);
          this.openModal('Go Back', 'Do you want to go back!!');
        }
        this.router.navigateByUrl('dashboard');
      },

      nzOnCancel: () => {
        setTimeout(() => {
          this.isVisible = false;
        }, 3000);
      }
    });
  }
}
