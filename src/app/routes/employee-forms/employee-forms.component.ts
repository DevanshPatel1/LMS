import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { IEmployee } from '../employee/employee.interface';
import { EmployeeService } from '../employee/employee.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-employee-forms',
  standalone: true,
  imports: [NzFormModule, NzSwitchModule, ReactiveFormsModule, FormsModule, NzDropDownModule, NzIconModule],
  templateUrl: './employee-forms.component.html',
  styles: ``
})
export class EmployeeFormsComponent implements OnInit {
  @Input() name!: string;
  @Input() depart!: string;
  @Input() email!: string;
  @Output() formSubmit = new EventEmitter<IEmployee>();
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({ 
      name: [this.name, Validators.required],
      depart: [this.depart, Validators.required],
      email: [this.email, [Validators.required, Validators.email]]
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      const formData: IEmployee = this.validateForm.value;
      this.empService.setData(formData);
      this.modalRef.destroy();
    }
  }
}
