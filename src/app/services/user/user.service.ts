import { Injectable } from '@angular/core';
import { IUser } from './user.interface'; // import your IUser interface
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/';
  public isVisible!: boolean;
  public isEditMode!: boolean;
  public isConfirmLoading!: boolean;
  public isOkLoading!: boolean;
  public users: IUser[] = [];
  public idToken!: string;
  constructor(
    private http: HttpClient
  ) {}

  createUser(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}user`, body);
  }
  updateUser(id: string, body: any): Observable<any> {
    if (id) {
      console.log(id);
      if (body) {
        console.log(body);
      }
    }
    return this.http.patch(`${this.apiUrl}user/${id}`, body);
  }
  getUserById(id: string) {
    console.log('ID: ', id);
    return this.http.get(`${this.apiUrl}user/${id}`);
  }
  getAllUser() {
    return this.http.get<IUser[]>(`${this.apiUrl}user`);
  }
  deleteUserById(id: string) {
    console.log('Removed User Data by ID: ', id);
    this.http.delete(`${this.apiUrl}user/${id}`).subscribe(users => {
      this.users = this.users.filter(user => user.id !== this.idToken);
    });
    setTimeout(() => {
      this.getAllUser();
    }, 1000);
  }
}

