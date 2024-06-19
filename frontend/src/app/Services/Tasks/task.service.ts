import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { task, taskInfoResponse, allTasksResponse } from '../../Interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getToken(): string {
    const tok.en = localStorage.getItem('token') || '';
    return token;
  }

  create_task(task: task): Observable<taskInfoResponse> {
    return this.http.post<taskInfoResponse>(`${this.apiUrl}/task/create`, task);
  }

  get_all_tasks(): Observable<allTasksResponse> {
    return this.http.get<allTasksResponse>(`${this.apiUrl}/task/all`);
  }

  get_single_task(task_id: string): Observable<taskInfoResponse> {
    return this.http.get<taskInfoResponse>(`${this.apiUrl}/task/${task_id}`);
  }

  get_dept_tasks(dept_id: string): Observable<allTasksResponse> {
    return this.http.get<allTasksResponse>(`${this.apiUrl}/task/department/${dept_id}`);
  }

  get_employee_tasks(assigned_to: string): Observable<allTasksResponse> {
    return this.http.get<allTasksResponse>(`${this.apiUrl}/task/employee/${assigned_to}`);
  }

  get_manager_tasks(created_by: string): Observable<allTasksResponse> {
    return this.http.get<allTasksResponse>(`${this.apiUrl}/task/manager/${created_by}`);
  }

  update_task(task_id: string, task: task): Observable<taskInfoResponse> {
    return this.http.put<taskInfoResponse>(`${this.apiUrl}/task/update/${task_id}`, task, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      })
    });
  }

  delete_task(task_id: string): Observable<taskInfoResponse> {
    return this.http.delete<taskInfoResponse>(`${this.apiUrl}/task/delete/${task_id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    });
  }
}
