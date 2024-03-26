import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-activation',
  standalone: true,
  imports: [NzUploadModule, NzIconModule, NzButtonModule, NzCardModule],
  templateUrl: './activation.component.html',
  styles: ``
})
export class ActivationComponent {
  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      // this.msg.success();
      console.log(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      // this.msg.error();
      console.log(`${file.name} file upload failed.`);
    }
  }
}
