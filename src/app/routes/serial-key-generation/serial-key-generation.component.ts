import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Observable } from 'rxjs';

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

  createSerialKey(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}serialKeyGeneration`, body);
  }

  onClick() {
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      const values = this.validateForm.value;
      this.createSerialKey(values);
    }
    this.router.navigate(['registerSerial']);
  }
}
