import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CustomerService } from '../customer/customer.service';
import { ICustomer } from '../customer/customer.interface';
import { NzAutosizeDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzOptionComponent } from 'ng-zorro-antd/select';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

interface Option {
  label: string;
  value: string;
}

@Component({
  selector: 'app-customer-forms',
  standalone: true,
  imports: [
    NzFormModule,
    NzSwitchModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputGroupComponent,
    NzOptionComponent,
    NzIconModule,
    NzAutocompleteModule,
    NzAutosizeDirective
  ],
  templateUrl: './customer-forms.component.html',
  styles: `
  [nz-form] {
    max-width: 600px;
  }`
})
export class CustomerFormsComponent implements OnInit {
  @Input() id!: number;
  @Input() name!: string;
  @Input() address!: string;
  @Input() city!: string;
  @Input() state!: string;
  @Input() country!: string;
  @Output() formSubmit = new EventEmitter<ICustomer>();
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [this.name, Validators.required],
      address: [this.address, Validators.required],
      city: [this.city, Validators.required],
      state: [this.state, Validators.required],
      country: [this.country, Validators.required]
    });
  }
  city_select: Option = { label: 'Ahmedabad', value: 'Ahmedabad' };
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
  state_select: Option = { label: 'Gujarat', value: 'gujarat' };
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
  country_select: Option = { label: 'INDIA', value: 'india' };
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
  // onCityChange(city: string) {
    // if (city === 'ahmedabad') {
    //   this.validateForm.controls['state'].setValue('gujarat');
    //   this.validateForm.controls['country'].setValue('india');
    // }
    // handle other cities
  // }
  // onStateChange(state: string) {
    // if (state === 'gujarat') {
    //   this.validateForm.controls['country'].setValue('india');
    // }
  // }

  // onCountryChange(country: string) {
    // if (country === 'india') {
    //   this.validateForm.controls['state'].setValue('gujarat');
    // }
    // handle other countries
  // }

  submitForm(): void {
    if (this.validateForm.valid) {
      const formData: ICustomer = this.validateForm.value;
      console.log(formData.name);
      console.log(formData.address);
      console.log(formData.city);
      console.log(formData.state);
      console.log(formData.country);
      this.formSubmit.emit(formData);
      this.customerService.setData(formData);
      this.modalRef.destroy();
    }
  }
}
