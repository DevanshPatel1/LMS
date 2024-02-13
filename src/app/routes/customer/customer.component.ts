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
import { CustomerService } from './customer.service';
import { CustomerFormsComponent } from '../customer-forms/customer-forms.component';
import { ICustomer } from './customer.interface';

@Component({
  selector: 'app-customer',
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
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;

  constructor(
    private modalService: NzModalService,
    private router: Router,
    private customerService: CustomerService,
  ) {}
  listOfData: ICustomer[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        id: this.listOfData.length + 1,
        name: 'Edward',
        address: 'Edward Park',
        city: 'Edward',
        state: 'IDK',
        country: 'USA'
      });
    }
  }

  OnClickAddCustomer(): void {
    this.modalService.confirm({
      nzTitle: 'Add Customer',
      nzContent: 'Adding new customer',
      nzOkText: 'Add Customer',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.isOkLoading = true;
        if (this.isOkLoading == true) {
          setTimeout(() => {
            this.isVisible = false;
            this.isOkLoading = false;
          }, 3000);
          this.modalService.create({
            nzTitle: 'Add Customer',
            nzContent: CustomerFormsComponent,
            nzOkText: 'Yes',
            nzOnOk: () => {
              const data = this.customerService.getData();
              // console.log(data)
              console.log(data.name);
              console.log(data.address);
              console.log(data.city);
              console.log(data.state);
              console.log(data.country);
            },
            nzCancelText: 'Cancel',
            nzOnCancel: () => {
              setTimeout(() => {
                this.isVisible = false;
              }, 3000);
              this.openModal('Not Add Customer', 'Customer was not added');
            }
          });
        }
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => {
        setTimeout(() => {
          this.isVisible = false;
        }, 3000);
        this.openModal('Not Add Customer', 'Customer was not added');
      }
    });
  }

  OnClickEditCustomer(): void {
    this.modalService.confirm({
      nzTitle: 'Edit Customer',
      nzContent: 'Edit Customer-Details',
      nzOkText: 'Edit Customer',
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
            nzContent: CustomerFormsComponent,
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
        this.openModal('Not Edited', 'Customer was not Edited');
      }
    });
  }

  OnClickRemoveCustomer(): void {
    this.modalService.confirm({
      nzTitle: 'Remove',
      nzContent: 'Customer wants to remove',
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
        this.openModal('Not Remove', 'Customer is not removed.');
      }
    });

    console.log('Remove Customer clicked');
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
      nzContent: 'Customer wants to go back',
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
