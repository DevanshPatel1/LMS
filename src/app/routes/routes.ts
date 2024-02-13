import { Routes } from '@angular/router';
import { startPageGuard } from '@core';
import { authSimpleCanActivate, authSimpleCanActivateChild } from '@delon/auth';

import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { LayoutBasicComponent } from '../layout';
import { UserFormsComponent } from './user-forms/user-forms.component';
import { EmployeeComponent } from './employee/employee.component';
export const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    canActivateChild: [authSimpleCanActivateChild],
    data: {},
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
      { path: 'user', title: 'User', component: UserComponent },
      { path: 'customer', title: 'Customer', component: CustomerComponent },
      { path: 'user-forms', title:'User-Forms', component: UserFormsComponent},
      { path: 'employee', title:'Employee', component: EmployeeComponent }
    ]
  },

  // passport
  { path: '', loadChildren: () => import('./passport/routes').then(m => m.routes) },
  { path: 'exception', loadChildren: () => import('./exception/routes').then(m => m.routes) },
  { path: '**', redirectTo: 'exception/404' }
];
