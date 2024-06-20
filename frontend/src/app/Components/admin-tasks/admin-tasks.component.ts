import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { task, taskInfoResponse, allTasksResponse } from '../../Interfaces/task.interface';
import { TaskService } from '../../Services/Tasks/task.service';

@Component({
  selector: 'app-admin-tasks',
  standalone: true,
  imports: [ RouterLink, CommonModule ],
  templateUrl: './admin-tasks.component.html',
  styleUrl: './admin-tasks.component.css'
})

export class AdminTasksComponent implements OnInit {

  tasks: any[] = []
  error: string | null = null;

  constructor(private TaskService: TaskService){ }

  ngOnInit(): void {
    this.get_all_tasks();
  }

  get_all_tasks(): void {
    this.TaskService.get_all_tasks().subscribe(
      (response: allTasksResponse) => {
        console.log('All tasks:', response);
        this.tasks = response.tasks || [];
        this.error = null; // Clear any previous error
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.error = 'Error fetching tasks: ' + (error.message || 'Unknown error');
      }
    );
  }

  // navigate_to_update_task(){}
}
