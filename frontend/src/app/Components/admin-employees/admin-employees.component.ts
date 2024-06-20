import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/Users/user.service';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-admin-employees',
  standalone: true,
  imports: [ RouterLink, CommonModule, NavbarComponent, FooterComponent, AdminSidebarComponent],
  templateUrl: './admin-employees.component.html',
  styleUrl: './admin-employees.component.css', 
})

export class AdminEmployeesComponent {
  users: user[] = [];
  userInfoResponse: userInfoResponse;
  error: string = '';

  constructor(private UserService: UserService, private router: Router, private route: ActivatedRoute,){
    this.userInfoResponse = {} as userInfoResponse
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



