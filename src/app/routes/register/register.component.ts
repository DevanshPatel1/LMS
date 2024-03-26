import { HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { SocialService, DA_SERVICE_TOKEN, ALLOW_ANONYMOUS, SocialOpenType } from '@delon/auth';
import { I18nPipe, SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Router } from 'express';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioComponent } from 'ng-zorro-antd/radio';
import { NzTabsModule, NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.less'],
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    I18nPipe,
    NzCheckboxModule,
    NzTabsModule,
    NzAlertModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzToolTipModule,
    NzIconModule,
    NzRadioComponent
  ],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  private readonly router = inject(Router);
  private readonly http = inject(_HttpClient);

  form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPwd: ['', [Validators.required]],
    status: [false],
    countryCode: ['', [Validators.required]],
    gender: ['male'],
    active: [false],
    isVerified: [false]
  });
  error = '';
  type = 0;
  count = 0;
  interval$: any;
  submit(): void {
    this.error = '';
    if (this.type === 0) {
      const { name, email, password, confirmPwd, countryCode, status, active, isVerified, gender } = this.form.controls;
      name.markAsDirty();
      name.updateValueAndValidity();
      email.markAsDirty();
      email.updateValueAndValidity();
      password.markAsDirty();
      password.updateValueAndValidity();
      confirmPwd.markAsDirty();
      confirmPwd.updateValueAndValidity();
      status.markAsDirty();
      status.updateValueAndValidity();
      gender.markAsDirty();
      gender.updateValueAndValidity();
      countryCode.markAsDirty();
      countryCode.updateValueAndValidity();
      if (name.invalid || password.invalid) {
        return;
      }
    }
    this.http
      .post('localhost:3000/register', {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        confirmPwd: this.form.value.confirmPwd,
        status: this.form.value.status,
        active: this.form.value.active,
        gender: this.form.value.gender,
        countryCode: this.form.value.countryCode,
        isVerified: this.form.value.isVerified
      })
      .subscribe(res => {
        if (res.msg !== 'ok') {
          this.error = res.msg;
          return;
        }
      });

    this.router.navigateByUrl('/');
  }
}
