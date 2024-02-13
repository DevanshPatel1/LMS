import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageHeaderModule } from '@delon/abc/page-header';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { UserFormsComponent } from '../user-forms/user-forms.component';
import { IUser } from './user.interface';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzCardModule,
    NzAvatarModule,
    NzButtonModule,
    NzModalModule,
    NzDropDownModule,
    NzIconModule,
    NzLayoutModule,
    NzDividerModule,
    PageHeaderModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;

  constructor(
    private modalService: NzModalService,
    private router: Router,

    private userService: UserService
    // private http: HttpClient
  ) {}
  listOfData: IUser[] = [];

  // checked = false;
  // indeterminate = false;
  // listOfCurrentPageData: readonly IUser[] = [];
  // setOfCheckedId = new Set<number>();
  // onCurrentPageDataChange($event: readonly IUser[]): void {
  //   this.listOfCurrentPageData = $event;
  //   this.refreshCheckedStatus();
  // }

  // refreshCheckedStatus(): void {
  //   this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(Number(item.id)));
  //   this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(Number(item.id))) && !this.checked;
  // }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        id: this.listOfData.length + 1,
        name: `Edward King ${i}`,
        email: 'edward.king@getMaxListeners.com',
        isVerified: true,
        status: false,
        role: 'User'
      });
    }
    // this.listOfData = new Array(200).fill(0).map((_, index) => ({
    //   id: index,
    //   name: `Edward King ${index}`,
    //   email: 'edward.king@getMaxListeners.com',
    //   isVerified: true,
    //   status: false,
    //   role: 'User'
    // }));
  }
  OnClickAddUser(): void {
    this.modalService.confirm({
      nzTitle: 'Add User',
      nzContent: 'Adding new user',
      nzOkText: 'Add User',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.isOkLoading = true;
        if (this.isOkLoading == true) {
          setTimeout(() => {
            this.isVisible = false;
            this.isOkLoading = false;
          }, 3000);
          this.modalService.create({
            nzTitle: 'Add User',
            nzContent: UserFormsComponent,
            nzOkText: 'Yes',
            nzOnOk: () => {
              const data = this.userService.getData();
              // console.log(data)
              console.log(data.name);
              console.log(data.email);
              console.log(data.isVerified);
              console.log(data.status);
              console.log(data.role);
            },
            nzCancelText: 'Cancel',
            nzOnCancel: () => {
              setTimeout(() => {
                this.isVisible = false;
              }, 3000);
              this.openModal('Not Add User', 'User was not added');
            }
          });
          // this.listOfData = [...this.listOfData, data];
        }
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => {
        setTimeout(() => {
          this.isVisible = false;
        }, 3000);
        this.openModal('Not Add User', 'User was not added');
      }
    });
  }

  OnClickEditUser(): void {
    this.modalService.confirm({
      nzTitle: 'Edit User',
      nzContent: 'Edit User-Details',
      nzOkText: 'Edit User',
      nzOkType: 'primary',
      nzOnOk: () => {
        this.isOkLoading = true;
        if (this.isOkLoading == true) {
          setTimeout(() => {
            this.isVisible = false;
            this.isOkLoading = false;
          }, 3000);
          this.modalService.confirm({
            nzTitle: 'Confirmation!!',
            nzContent: UserFormsComponent,
            // nzData: { name: 'John', email: 'john@gmail.com', isVerified: true, status: false, role: 'Admin' },
            nzCancelText: 'Cancel',
            nzOnCancel: () => {
              setTimeout(() => {
                this.isVisible = false;
              }, 3000);
            }
          });
        }
      },
      nzCancelText: 'Cancel',
      nzOnCancel: () => {
        setTimeout(() => {
          this.isVisible = false;
        }, 3000);
        this.openModal('Not Edited', 'User was not Edited');
      }
    });
  }

  OnClickRemoveUser(): void {
    this.modalService.confirm({
      nzTitle: 'Remove',
      nzContent: 'User wants to remove',
      nzOnOk: () => {
        this.isOkLoading = true;
        if (this.isOkLoading == true) {
          setTimeout(() => {
            this.isVisible = false;
            this.isOkLoading = false;
          }, 3000);
          this.openModal('Remove User', 'Removed a user detail.');
          // this.listOfData = this.listOfData.filter(user => user.id !== );
        }
        // this.setOfCheckedId.clear();
        // this.isVisible = true;
        // this.refreshCheckedStatus();
      },
      nzOnCancel: () => {
        setTimeout(() => {
          this.isVisible = false;
        }, 3000);
        this.openModal('Not Remove', 'User is not removed.');
      }
    });

    console.log('Remove User clicked', event);
  }

  private openModal(title: string, content: string): void {
    this.modalService.info({
      nzTitle: title,
      nzContent: content,
      nzOnOk: () => {
        this.isOkLoading = true;
        setTimeout(() => {
          this.isVisible = false;
          this.isOkLoading = false;
        }, 3000);
      }
    });
  }

  log(): void {
    console.log('click dropdown button');
  }

  submitForm(data: any): void {
    console.log('Form data:', data);
  }

  // updateList(data: any): void {
  //   this.listOfData = [...this.listOfData, data];
  // }

  OnClickGoBack() {
    this.modalService.confirm({
      nzTitle: 'GoBack',
      nzContent: 'User wants to go back',
      nzOnOk: () => {
        this.isOkLoading = true;
        if (this.isOkLoading == true) {
          setTimeout(() => {
            this.isVisible = false;
            this.isOkLoading = false;
          }, 3000);
          this.openModal('Go Back', 'Do you want to go back!!');
        }
        this.router.navigateByUrl('dashboard');
      },

      nzOnCancel: () => {
        setTimeout(() => {
          this.isVisible = false;
        }, 3000);
      }
    });
  }
}
