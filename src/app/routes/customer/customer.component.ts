import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Subscription } from 'rxjs';
import { ICustomer } from 'src/app/interfaces/customer/customer.interface';
import { CustomerService } from 'src/app/services/customer/customer.service';
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzDividerModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule
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
    // console.log(this.customerService.isEditMode);
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
      nzTitle: 'Go Back !!!',
      nzContent: 'Do want to go back?',
      nzOnOk: () => {
        this.customerService.isOkLoading = true;
        if (this.customerService.isOkLoading == true) {
          setTimeout(() => {
            this.customerService.isVisible = false;
            this.customerService.isOkLoading = false;
          }, 3000);
        }
        this.router.navigateByUrl('dashboard');
      },
      nzOnCancel: () => {
        setTimeout(() => {
          this.customerService.isVisible = false;
        }, 3000);
        this.router.navigate(['customer']);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.customerSubscription && !this.customerSubscription.closed) {
      this.customerSubscription.unsubscribe();
    }
  }
}
