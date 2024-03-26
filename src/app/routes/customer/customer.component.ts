import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ICustomer } from '../../interfaces/customer/customer.interface';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../services/customer/customer.service';
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
    PageHeaderModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit, OnDestroy {
  customers: ICustomer[] = [];
  customerSubscription!: Subscription;
  // public idToken!: string;
  constructor(
    private modalService: NzModalService,
    private router: Router,
    private customerService: CustomerService
  ) {}
  ngOnInit(): void {
    this.customerSubscription = this.customerService.getAllCustomer().subscribe(customers => {
      this.customers = customers;
    });
  }
  OnClickAddCustomer(): void {
    this.router.navigate(['customerForms']);
    this.customerService.isEditMode = false;
    console.log(this.customerService.isEditMode);
  }
  //Though Im getting id form the DB but to pass it to submit function Im storing it in separate variable.
  OnClickEditCustomer(id: string): void {
    this.customerService.idToken = id;
    this.customerService.isEditMode = true;
    this.router.navigate(['customerForms']);
  }
  OnClickRemoveCustomer(id: string): void {
    this.customerService.idToken = id;
    this.customerService.deleteCustomerById(id);
    this.customers = this.customers.filter(customer => customer.id !== this.customerService.idToken);
    setTimeout(() => {
      this.customerService.getAllCustomer();
    }, 1000);
  }
  OnClickGoBack() {
    this.modalService.confirm({
      nzTitle: 'GoBack',
      nzContent: 'Customer wants to go back',
      nzOnOk: () => {
        this.customerService.isOkLoading = true;
        if (this.customerService.isOkLoading == true) {
          setTimeout(() => {
            this.customerService.isVisible = false;
            this.customerService.isOkLoading = false;
          }, 3000);
          this.customerService.openModal('Go Back', 'Do you want to go back!!');
        }
        this.router.navigateByUrl('dashboard');
      },
      nzOnCancel: () => {
        setTimeout(() => {
          this.customerService.isVisible = false;
        }, 3000);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.customerSubscription && !this.customerSubscription.closed) {
      this.customerSubscription.unsubscribe();
    }
  }
}
