import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../Services/Users/user.service';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-manager-employees',
  standalone: true,
  imports: [ RouterLink, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './manager-employees.component.html',
  styleUrl: './manager-employees.component.css'
})

export class ManagerEmployeesComponent {
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

}
