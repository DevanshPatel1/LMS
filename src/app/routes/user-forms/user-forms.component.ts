import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { IUser } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-user-forms',
  standalone: true,
  imports: [NzFormModule, NzSwitchModule, ReactiveFormsModule, FormsModule, NzDropDownModule, NzIconModule],
  templateUrl: './user-forms.component.html',
  styles: `     
  [nz-form] {
    max-width: 600px;
  }`
})
export class UserFormsComponent implements OnInit {
  @Input() id!: number;
  @Input() name!: string;
  @Input() email!: string;
  @Input() isVerified!: boolean;
  @Input() status!: boolean;
  @Input() role!: string;
  @Output() formSubmit = new EventEmitter<IUser>();
  validateForm!: FormGroup;
  switchValue1 = false;
  switchValue2 = false;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [this.name, Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      isVerified: [this.isVerified, Validators.required],
      status: [this.role, Validators.required],
      role: [this.role, Validators.required]
    });
  }

  // postFormData(formData: IUser): Observable<any> {
  //   const url = 'http://localhost:4200/#/user'; // replace with your endpoint
  //   return this.http.post(url, formData);
  // }
  submitForm(): void {
    if (this.validateForm.valid) {
      const formData: IUser = this.validateForm.value;
      // console.log(formData.name);
      // console.log(formData.email);
      // console.log(formData.isVerified);
      // console.log(formData.status);
      // console.log(formData.role);
      // this.formSubmit.emit(formData);
      this.userService.setData(formData);
      this.modalRef.destroy();
    }
  }
  // submitForm(): void {
  //   if (this.validateForm.valid) {
  //     const formData: IUser = this.validateForm.value;
  //     this.postFormData(formData).subscribe(
  //       next => {
  //         console.log(next); // handle the response here
  //         this.modalRef.destroy();
  //       },
  //       err => { console.error(err); // handle error here
  //       },
  //     );
  //   }
  // }
}
