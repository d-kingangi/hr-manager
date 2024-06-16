import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/Users/user.service';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-admin-employees',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './admin-employees.component.html',
  styleUrl: './admin-employees.component.css'
})

export class AdminEmployeesComponent {
  user: user[]=[]

  constructor(private UserService: UserService){
    this.get_all_user()
  }
  
  get_all_user(){}

  navigate_to_single_user(){}
}



