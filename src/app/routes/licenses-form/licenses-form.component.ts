import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerComponent, NzRangePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { getISOWeek } from 'date-fns';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-licenses-form',
  standalone: true,
  imports: [
    NzInputModule,
    NzCardModule,
    FormsModule,
    NzButtonModule,
    ReactiveFormsModule,
    CommonModule,
    NzFormModule,
    NzDatePickerComponent,
    NzRangePickerComponent,
    NzSelectComponent,
    NzOptionComponent
  ],
  templateUrl: './licenses-form.component.html',
  styles: ``
})
export class LicensesFormComponent {
  isEditMode = false;
  date = null;
  rangeDate = null;
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      selectedProduct: [''],
      selectedProductSpec: [''],
      applicationName: ['', [Validators.required]],
      orderNumber: ['', [Validators.required]],
      invoiceNo: ['', [Validators.required]],
      serialNumber: ['', [Validators.required]],
      licenseType: ['', [Validators.required]],
      selectedValue: [''],
      orderDate: [''],
      invoiceDate: ['']
    });
  }
  optionList = [
    { label: 'Active', value: 'active' },
    { label: 'InActive', value: 'inactive' }
  ];

  productList = [
    { label: 'Product1', value: 'product1' },
    { label: 'Product2', value: 'product2' }
  ];
  productSpecList = [
    { label: 'Product1 Spec', value: 'product1 spec' },
    { label: 'Product2 Spec', value: 'product2 spec' }
  ];
  selectedProduct = { label: 'Product1', value: 'product1' };
  selectedProductSpec = { label: 'Product1 Spec', value: 'product1 spec' };
  selectedValue = { label: 'InActive', value: 'inactive' };
  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  log(value: { label: string; value: string }): void {
    console.log(value);
  }

  submitForm() {
    console.log('Content is submitted');
    if (this.validateForm.valid) {
      const {
        selectedProduct,
        selectedProductSpec,
        applicationName,
        orderNumber,
        invoiceNo,
        serialNumber,
        licenseType,
        selectedValue,
        orderDate,
        invoiceDate
      } = this.validateForm.value;
      console.log(
        'Content is: ',
        selectedProduct,
        selectedProductSpec,
        applicationName,
        orderNumber,
        invoiceNo,
        serialNumber,
        licenseType,
        selectedValue,
        orderDate,
        invoiceDate,
      );
    }
    this.validateForm.reset();
  }
}
