import { Routes } from '@angular/router';
import { startPageGuard } from '@core';
import { authSimpleCanActivate, authSimpleCanActivateChild } from '@delon/auth';

import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { LayoutBasicComponent } from '../layout';
import { EmployeeComponent } from './employee/employee.component';
import { LicensesComponent } from './licenses/licenses.component';
import { ActivationComponent } from './activation/activation.component';
import { LicensesFormComponent } from './licenses-form/licenses-form.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { CustomerFormsComponent } from './customer-forms/customer-forms.component';
import { ProspectsComponent } from './prospects/prospects.component';
import { EmployeeFormsComponent } from './employee-forms/employee-forms.component';
import { SerialKeyGenerationComponent } from './serial-key-generation/serial-key-generation.component';
import { RegisterComponent } from './register/register.component';
import { UserFormsComponent } from './user-forms/user-forms.component';
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
      { path: 'userForms', title: 'UserForms', component: UserFormsComponent},
      { path: 'customer', title: 'Customer', component: CustomerComponent },
      { path: 'customerForms', title: 'CustomerForms', component: CustomerFormsComponent },
      { path: 'employee', title: 'Employee', component: EmployeeComponent },
      { path: 'employeeForms', title: 'EmployeeForms', component: EmployeeFormsComponent },
      { path: 'licenses', title: 'Licenses', component: LicensesComponent },
      { path: 'activation', title: 'Activation', component: ActivationComponent },
      { path: 'registerSerial', title: 'LicensesForm', component: LicensesFormComponent },
      { path: 'evaluation', title: 'Evaluation', component: EvaluationComponent },
      { path: 'prospects', title: 'Prospects', component: ProspectsComponent },
      { path: 'generateSerial', title: 'Generate Serial Key', component: SerialKeyGenerationComponent },
      // { path: 'register', title: 'Register', component: RegisterComponent }
    ]
  },

  // passport
  { path: '', loadChildren: () => import('./passport/routes').then(m => m.routes) },
  { path: 'exception', loadChildren: () => import('./exception/routes').then(m => m.routes) },
  { path: '**', redirectTo: 'exception/404' }
];
