import { HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, SocialOpenType, SocialService } from '@delon/auth';
import { I18nPipe, SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabChangeEvent, NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { finalize } from 'rxjs';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    NzIconModule
  ]
})
export class LoginComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly settingsService = inject(SettingsService);
  private readonly socialService = inject(SocialService);
  private readonly reuseTabService = inject(ReuseTabService, { optional: true });
  private readonly tokenService = inject(DA_SERVICE_TOKEN);
  private readonly startupSrv = inject(StartupService);
  private readonly http = inject(_HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  form = inject(FormBuilder).nonNullable.group({
    userName: ['', [Validators.required, Validators.pattern(/^(admin)$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(ng\-alain\.com)$/)]],
    remember: [true]
  });
  error = '';
  type = 0;
  loading = false;
  count = 0;
  interval$: any;
  switch({ index }: NzTabChangeEvent): void {
    this.type = index!;
  }
  submit(): void {
    this.error = '';
    if (this.type === 0) {
      const { userName, password } = this.form.controls;
      userName.markAsDirty();
      userName.updateValueAndValidity();
      password.markAsDirty();
      password.updateValueAndValidity();
      if (userName.invalid || password.invalid) {
        return;
      }
    }

    //  (https://ng-alain.com/auth/getting-started) Token
    //  `ALLOW_ANONYMOUS`  Token
    this.loading = true;
    this.cdr.detectChanges();
    this.http
      .post(
        '/login/account',
        {
          type: this.type,
          userName: this.form.value.userName,
          password: this.form.value.password
        },
        null,
        {
          context: new HttpContext().set(ALLOW_ANONYMOUS, true)
        }
      )
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        if (res.msg !== 'ok') {
          this.error = res.msg;
          this.cdr.detectChanges();
          return;
        }

        this.reuseTabService?.clear();

        // TODO: Mock expired value
        res.user.expired = +new Date() + 1000 * 60 * 5;
        this.tokenService.set(res.user);
        // StartupService
        this.startupSrv.load().subscribe(() => {
          let url = this.tokenService.referrer!.url || '/';
          if (url.includes('/passport')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });
      });
  }

  open(type: string, openType: SocialOpenType = 'href'): void {
    let url = ``;
    let callback = ``;
    if (environment.production) {
      callback = `https://ng-alain.github.io/ng-alain/#/passport/callback/${type}`;
    } else {
      callback = `http://localhost:4200/#/passport/callback/${type}`;
    }
    switch (type) {
      case 'auth0':
        url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(callback)}`;
        break;
      case 'github':
        url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
          callback
        )}`;
        break;
      case 'weibo':
        url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
        break;
    }
    if (openType === 'window') {
      this.socialService
        .login(url, '/', {
          type: 'window'
        })
        .subscribe(res => {
          if (res) {
            this.settingsService.setUser(res);
            this.router.navigateByUrl('/');
          }
        });
    } else {
      this.socialService.login(url, '/', {
        type: 'href'
      });
    }
  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
