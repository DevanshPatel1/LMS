import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzModalService } from "ng-zorro-antd/modal";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTableModule } from "ng-zorro-antd/table";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: 'app-user-forms',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzDividerModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule
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
      status: [''],
      countryCode: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      active: [''],
      isVerified: [''],
      role: ['', [Validators.required]]
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
    this.submitForm();
    if (this.isEditMode) {
      this.modalService.info({
        nzTitle:'Editing User Details', 
        nzContent: 'User Details is Edited',
        nzOnOk: () =>{
          this.userService.getAllUser();
          this.router.navigate(['user']);
          this.isConfirmLoading = false;
        }
      });
    } else {
      this.modalService.info({
        nzTitle: 'Adding User', 
        nzContent: 'New User is added',
        nzOnOk: () =>{
          this.userService.getAllUser();
          this.router.navigate(['user']);
          this.isConfirmLoading = false;
        }
      });
    }
  }
  resetForm(): void {
    this.validateForm.reset();
  }
  log(value: { label: string; value: string }): void {
    console.log(value);
  }
}
