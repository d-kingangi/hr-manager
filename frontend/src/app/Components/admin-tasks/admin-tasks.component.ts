import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

export class AdminTasksComponent {

  tasks: task[] = []
  error: string = '';

  constructor(private TaskService: TaskService){ }

  ngOnInit(): void {
    this.get_all_tasks();
  }

  get_all_tasks(): void {
    this.TaskService.get_all_tasks().subscribe(
      (response: allTasksResponse) => {
        console.log('All tasks:', response);
        this.tasks = response.tasks || [];
      },
      (error) => {
        console.error('Error fetching tasks:', error);

      }
    )

  }

  // navigate_to_update_task(){}
}
