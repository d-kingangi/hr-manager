import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { UserService, } from '../../Services/Users/user.service';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ManagerSidebarComponent } from '../manager-sidebar/manager-sidebar.component';

@Component({
  selector: 'app-manager-employees',
  standalone: true,
  imports: [ RouterLink, CommonModule, NavbarComponent, FooterComponent, ManagerSidebarComponent],
  templateUrl: './manager-employees.component.html',
  styleUrl: './manager-employees.component.css'
})

export class ManagerEmployeesComponent {
  users: user[] = [];
  error: string = '';

  constructor(private UserService: UserService, private router: Router, private ActivatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    this.get_all_users();
  }
  
  get_all_users() {
    this.UserService.get_all_users().subscribe(
      (response: allUsersResponse) => {
        console.log('all users:', response)
        this.users = response.users; 
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  navigate_to_single_user(user_id: string): void {
    this.router.navigate([`/profile/employee/${user_id}`]);
  }

}
