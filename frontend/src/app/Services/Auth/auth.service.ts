import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginDetails, loginResponse } from '../../Interfaces/login.interface';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  readToken(token:string){
    return this.http.get<{info:userInfoResponse}>(`${this.apiUrl}/auth/checkdetails`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'token': token
      })
    })
  }

  loginUser(details: loginDetails): Observable<loginResponse>{
    return this.http.post<loginResponse>(`${this.apiUrl}/auth/login`, details)
  }

  checkUserDetails(token: string){
    return this.http.get<userInfoResponse>(`${this.apiUrl}/auth/checkdetails`, {
       headers: {
        token
      }
    })
  }
}
