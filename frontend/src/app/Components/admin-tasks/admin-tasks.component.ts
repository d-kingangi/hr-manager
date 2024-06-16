import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { task, taskInfoResponse, allTasksResponse } from '../../Interfaces/task.interface';
import { TaskService } from '../../Services/Tasks/task.service';

@Component({
  selector: 'app-admin-tasks',
  standalone: true,
  imports: [ RouterLink, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './admin-tasks.component.html',
  styleUrl: './admin-tasks.component.css'
})
export class AdminTasksComponent {

  tasks: task[] = []

  constructor(private TaskService: TaskService){
    this.get_all_tasks()
  }

  get_all_tasks(){}

  navigate_to_update_task(){}
}
