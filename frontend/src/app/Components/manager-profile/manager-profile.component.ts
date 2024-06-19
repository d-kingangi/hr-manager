import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/Users/user.service'
import { TaskService } from '../../Services/Tasks/task.service'
import { task, taskInfoResponse, allTasksResponse} from '../../Interfaces/task.interface'
import { user } from '../../Interfaces/user.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ManagerSidebarComponent } from '../manager-sidebar/manager-sidebar.component';

@Component({
  selector: 'app-manager-profile',
  standalone: true,
  imports: [ RouterLink, NavbarComponent, FooterComponent, CommonModule, ManagerSidebarComponent],
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.css'
})

export class ManagerProfileComponent {

  user: user | null = null
  tasks: task[] = [];
  error!: string

  constructor(private route: ActivatedRoute, private UserService: UserService, private TaskService: TaskService){}

  ngOnInit(): void {
    this.get_single_user_profile();
  }

  get_single_user_profile(): void {
    const user_id = this.route.snapshot.paramMap.get('user_id'); 
    if (user_id) {
      this.UserService.get_single_user(user_id).subscribe(
        (user: user) => {
          this.user = user;
          console.log('User profile fetched:', this.user);
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } else {
      console.error('User ID parameter is missing.');
    }
  }

  get_user_tasks(): void {
    const user_id = this.route.snapshot.paramMap.get('user_id');
    if (this.user) {
      this.TaskService.get_employee_tasks(this.user.user_id).subscribe(
        (response: allTasksResponse) => {
          this.tasks = response.tasks; 
          console.log('Tasks fetched:', this.tasks);
        },
        (error) => {
          console.error('Error fetching tasks:', error);
        }
      );
    } else {
      console.error('User data is not available.');
    }
  }
}
