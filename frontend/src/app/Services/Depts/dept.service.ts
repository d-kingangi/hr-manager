import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { department, departmentInfoResponse, allDepartmentsResponse } from '../../Interfaces/dept.interface';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeptService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getToken(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }

  create_dept(department: department): Observable<departmentInfoResponse> {
    return this.http.post<departmentInfoResponse>(`${this.apiUrl}/dept/new`, department, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    });
  }

  get_all_depts(): Observable<allDepartmentsResponse> {
    return this.http.get<allDepartmentsResponse>(`${this.apiUrl}/dept/all`);
  }

  get_single_dept(dept_id: string): Observable<departmentInfoResponse> {
    return this.http.get<departmentInfoResponse>(`${this.apiUrl}/dept/${dept_id}`);
  }

  get_dept_employees(dept_id: string): Observable<allUsersResponse> {
    return this.http.get<allUsersResponse>(`${this.apiUrl}/dept/${dept_id}/employees`);
  }

  update_dept(dept_id: string, department: department): Observable<departmentInfoResponse> {
    return this.http.put<departmentInfoResponse>(`${this.apiUrl}/dept/update/${dept_id}`, department, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    });
  }

  delete_dept(dept_id: string): Observable<departmentInfoResponse> {
    return this.http.delete<departmentInfoResponse>(`${this.apiUrl}/dept/delete/${dept_id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    });
  }
}
