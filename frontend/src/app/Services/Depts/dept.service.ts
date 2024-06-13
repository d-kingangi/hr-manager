import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { department, departmentInfoResponse, allDepartmentsResponse } from '../../Interfaces/dept.interface';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class DeptService {
  private apiUrl = 'http://localhost:3000'

  getToken(){
    const token = localStorage.getItem('token') as string
    return token
  }

  constructor(private http:HttpClient) { }

  create_dept(department: department){
    return this.http.post<departmentInfoResponse>(`${this.apiUrl}/dept/new`, department)
  }

  get_all_depts(){
    return this.http.get<allDepartmentsResponse>(`${this.apiUrl}/dept/all`)
  }

  get_single_dept(dept_id: string){
    return this.http.get<departmentInfoResponse>(`${this.apiUrl}/dept/${dept_id}`)
  }

  get_dept_employees(dept_id: string){
    return this.http.get<allUsersResponse>(`${this.apiUrl}/dept/${dept_id}/employees`)
  }

  update_dept(dept_id: string, department: department){
    return this.http.put<departmentInfoResponse>(`${this.apiUrl}/dept/update/${dept_id}`, department),{
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }

  delete_dept(dept_id: string){
    return this.http.delete<departmentInfoResponse>(`${this.apiUrl}/dept/delete/${dept_id}`),{
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    }
  }
}
