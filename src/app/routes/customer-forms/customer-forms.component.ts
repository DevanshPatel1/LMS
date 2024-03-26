import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeaderModule } from '@delon/abc/page-header';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Option } from '../../interfaces/customer/customer.interface';
import { CustomerService } from '../../services/customer/customer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-forms',
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
  templateUrl: './customer-forms.component.html',
  styles: ``
})
export class CustomerFormsComponent implements OnInit {
  ngOnInit(): void {
    this.resetForm();
  }
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private modalService: NzModalService
  ) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      createdBy: ['', [Validators.required]]
    });
  }
  isConfirmLoading = this.customerService.isConfirmLoading;
  isEditMode = this.customerService.isEditMode;
  idToken = this.customerService.idToken;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('Form is called:', this.validateForm);
      const userInput = this.validateForm.value;
      const customerData = {
        name: userInput.name,
        address: userInput.address,
        city: userInput.city,
        state: userInput.state,
        country: userInput.country,
        createdBy: userInput.createdBy
      };
      if (this.isEditMode) {
        if (this.idToken) {
          console.log(this.idToken, 'tttttttttttttttttttttt');
        }
        this.customerService.updateCustomer(this.idToken, customerData).subscribe({
          next: response => {
            console.log(`Customer updated: id:${response.id}`);
          },
          error: err => {
            console.error('Error updating customer:', err);
          }
        });
      } else {
        this.customerService.createCustomer(customerData).subscribe({
          next: response => {
            console.log(`customer created: id:${response.id}`);
          },
          error: err => {
            console.error('Error creating customer:', err);
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

  // TODO: If form is not filled stay at same page else popup

  handleOk(): void {
    if (!this.validateForm.valid) {
      this.router.navigate(['customerForms']);
    }
    this.isConfirmLoading = true;
    if (this.isEditMode) {
      this.customerService.openModal('Editing Customer Details', 'Customer Details is Edited');
    } else {
      this.customerService.openModal('Adding Customer', 'New Customer is added');
    }
    this.submitForm();
    setTimeout(() => {
      this.isConfirmLoading = false;
      this.customerService.getAllCustomer();
      this.router.navigate(['customer']);
    }, 1000);
  }
  resetForm(): void {
    this.validateForm.reset();
  }
  cities: Option[] = [
    { label: 'Ahmedabad', value: 'ahmedabad' },
    { label: 'Gandhinagar', value: 'gandhinagar' },
    { label: 'Surat', value: 'surat' },
    { label: 'Porbandar', value: 'porbandar' },
    { label: 'Vadodara', value: 'vadodara' },
    { label: 'Bhavnagar', value: 'bhavnagar' },
    { label: 'Anand', value: 'anand' },
    { label: 'Junagadh', value: 'junagadh' },
    { label: 'Kalol', value: 'kalol' },
    { label: 'Mehsana', value: 'mehsana' }
  ];
  states: Option[] = [
    { label: 'Gujarat', value: 'gujarat' },
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Pune', value: 'pune' },
    { label: 'Bangalore', value: 'bangalore' },
    { label: 'Odisha', value: 'odisha' },
    { label: 'Punjab', value: 'punjab' },
    { label: 'Jammu and Kashmir', value: 'jammu and kashmir' },
    { label: 'Hyderabad', value: 'hyderabad' },
    { label: 'Chennai', value: 'chennai' },
    { label: 'Kolkata', value: 'kolkata' }
  ];
  countries: Option[] = [
    { label: 'India', value: 'india' },
    { label: 'Usa', value: 'usa' },
    { label: 'Uk', value: 'uk' },
    { label: 'France', value: 'france' },
    { label: 'Italy', value: 'italy' },
    { label: 'Finland', value: 'finland' },
    { label: 'Greece', value: 'greece' },
    { label: 'Mexico', value: 'mexico' },
    { label: 'Japan', value: 'japan' },
    { label: 'China', value: 'china' },
    { label: 'Australia', value: 'australia' },
    { label: 'Canada', value: 'canada' }
  ];
  compareFun = (o1: Option | string, o2: Option): boolean => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };
}
