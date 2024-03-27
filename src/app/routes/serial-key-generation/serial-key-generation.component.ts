import { CommonModule } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Observable, tap } from 'rxjs';
@Component({
  selector: 'app-serial-key-generation',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NzButtonComponent, NzInputModule, NzFormModule, NzCardComponent],
  templateUrl: './serial-key-generation.component.html',
  styles: ``
})
export class SerialKeyGenerationComponent {
  private apiUrl = 'http://localhost:3000/';
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      numberOf: ['', [Validators.required]],
      series: ['', [Validators.required]]
    });
  }
  // createSerialKey(body: any) {
  //   return this.http.post(`${this.apiUrl}serialKeyGeneration`, body);
  // }
  // onClick() {
  //   if (this.validateForm.valid) {
  //     console.log(this.validateForm.value);
  //     const body = this.validateForm.value;
  //     this.createSerialKey(body).subscribe({
  //       next: response => {
  //         console.log('Response from server', response);
  //         this.router.navigate(['registerSerial']);
  //       },
  //       error: error => {
  //         console.log('Error', error);
  //       }
  //     });
  //   }
  // }
  createSerialKey(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}serialKeyGeneration`, body, {
      responseType: 'blob', // Set the response type to blob
      observe: 'response' // Observe the full response
    }).pipe(
      tap((response: HttpResponse<Blob>) => {
        if (response.body) {
          this.downloadFile(response.body);
        } else {
          console.error('Response body is null');
        }
      })
    );
  }

  private downloadFile(blob: Blob) {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = 'licenseKey.csv'; // Set the file name here
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  onClick() {
    if (this.validateForm.valid) {
      const body = this.validateForm.value;
      this.createSerialKey(body).subscribe({
        next: () => {
          console.log('File downloaded successfully');
          this.router.navigate(['registerSerial']);
        },
        error: error => {
          console.log('Error', error);
        }
      });
    }
  }
}
