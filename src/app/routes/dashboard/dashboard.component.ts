import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderModule } from '@delon/abc/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderModule, NzButtonModule]
})
export class DashboardComponent {
  constructor(private router: Router) {}

  // OnClickUser() {
  //   this.router.navigateByUrl('user');
  // }

  // OnClickCustomer() {
  //   this.router.navigateByUrl('customer');
  // }

  // OnClickEmployee() {
  //   this.router.navigateByUrl('employee');
  // }

  // OnClickLicenses() {
  //   this.router.navigateByUrl('licenses');
  // }

  // OnClickActivation() {
  //   this.router.navigateByUrl('activation');
  // }
}
