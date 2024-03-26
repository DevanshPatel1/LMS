import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-user-forms',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzCardModule,
    NzButtonModule,
    NzLayoutModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    NzSelectComponent,
    NzOptionComponent
  ],
  templateUrl: './user-forms.component.html',
  styles: ``
})
export class UserFormsComponent implements OnInit {
  ngOnInit(): void {
    this.resetForm();
  }

  // userRole = Object.values.(UserRole)
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private modalService: NzModalService
  ) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPwd: ['', [Validators.required]],
      status: [false],
      countryCode: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      active: [false],
      isVerified: [false],
      role: ["USER", [Validators.required]]
    });
  }
  isConfirmLoading = this.userService.isConfirmLoading;
  isEditMode = this.userService.isEditMode;
  idToken = this.userService.idToken;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('Form is called:', this.validateForm);
      const userInput = this.validateForm.value;
      const userData = {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
        confirmPwd: userInput.confirmPwd,
        status: userInput.status,
        countryCode: userInput.countryCode,
        gender: userInput.gender,
        active: userInput.active,
        isVerified: userInput.isVerified,
        role: userInput.role
      };
      if (this.isEditMode) {
        if (this.idToken) {
          console.log(this.idToken);
        }
        if (userData.password === userData.confirmPwd) {
          this.userService.updateUser(this.idToken, userData).subscribe({
            next: response => {
              console.log(`User updated: id:${response.id}`);
            },
            error: err => {
              console.error('Error updating user:', err);
            }
          });
        } else {
          this.userService.createUser(userData).subscribe({
            next: response => {
              console.log(`user created: id:${response.id}`);
            },
            error: err => {
              console.error('Error creating user:', err);
            }
          });
        }
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
  handleOk(): void {
    if (!this.validateForm.valid) {
      this.router.navigate(['userForms']);
    }
    this.isConfirmLoading = true;
    if (this.isEditMode) {
      this.userService.openModal('Editing User Details', 'User Details is Edited');
    } else {
      this.userService.openModal('Adding User', 'New User is added');
    }
    this.submitForm();
    setTimeout(() => {
      this.isConfirmLoading = false;
      this.userService.getAllUser();
      this.router.navigate(['user']);
    }, 1000);
  }
  resetForm(): void {
    this.validateForm.reset();
  }
  log(value: { label: string; value: string }): void {
    console.log(value);
  }
}
