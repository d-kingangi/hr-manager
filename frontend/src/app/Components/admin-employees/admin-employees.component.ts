import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/Users/user.service';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-admin-employees',
  standalone: true,
  imports: [ RouterLink, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './admin-employees.component.html',
  styleUrl: './admin-employees.component.css'
})

export class AdminEmployeesComponent {
  users: user[] = [];
  error: string = '';

  constructor(private UserService: UserService){
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

  // navigateToSingleUser(userId: string) {
  //   this.router.navigate(['/user', userId]); // Example route, adjust as per your routing setup
  // }
}



