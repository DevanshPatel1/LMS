import { Component } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { listOfData } from '../../../assets/data/constant';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-licenses',
  standalone: true,
  imports: [
    NzInputModule,
    NzIconModule,
    NzCardModule,
    NzSelectModule,
    FormsModule,
    NzButtonModule,
    NzAutocompleteModule,
    NzCollapseModule,
    NzTableModule,
  ],
  templateUrl: './licenses.component.html',
  styles: ``
})
export class LicensesComponent {
  isVisible = false;
  isOkLoading = false;
  listOfData = listOfData;
  //SelectMenu
  selectedValue = null;
  //AutoComplete
  inputValue?: string;
  filteredOptions: string[] = [];
  options = ['Product1', 'Product2', 'Product3', 'New Product'];
  constructor(private router: Router, private modalService: NzModalService) {
    this.filteredOptions = this.options;
  }
  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  //Tables
  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  OnClickEdit(id:string){
    this.router.navigateByUrl('licensesForm');
  }
  
  OnClickGoBack() {
    this.modalService.confirm({
      nzTitle: 'GoBack',
      nzContent: 'Customer wants to go back',
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
  openModal(title: string, content: string): void {
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
}
