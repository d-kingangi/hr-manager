import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getToken(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }

  register_user(user: user): Observable<userInfoResponse> {
    return this.http.post<userInfoResponse>(`${this.apiUrl}/user/register`, user);
  }

  get_all_users(): Observable<allUsersResponse> {
    return this.http.get<allUsersResponse>(`${this.apiUrl}/user/all`);
  }

  get_single_user(user_id: string): Observable<user> {
    return this.http.get<user>(`${this.apiUrl}/user/${user_id}`);
  }

  update_user(user_id: string, user: user): Observable<userInfoResponse> {
    return this.http.put<userInfoResponse>(`${this.apiUrl}/user/update/${user_id}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    });
  }

  delete_user(user_id: string): Observable<userInfoResponse> {
    return this.http.delete<userInfoResponse>(`${this.apiUrl}/user/delete/${user_id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    });
  }
}
