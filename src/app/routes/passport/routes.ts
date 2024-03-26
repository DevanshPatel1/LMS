import { Routes } from '@angular/router';

import { CallbackComponent } from './callback.component';
import { LoginComponent } from './login/login.component';
import { LayoutPassportComponent } from '../../layout';
import { RegisterComponent } from '../register/register.component';

export const routes: Routes = [
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
      }
    ]
  },

  { path: 'passport/callback/:type', component: CallbackComponent }
];
