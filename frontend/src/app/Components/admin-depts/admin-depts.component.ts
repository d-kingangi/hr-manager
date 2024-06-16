import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { department, departmentInfoResponse, allDepartmentsResponse } from '../../Interfaces/dept.interface';
import { DeptService } from '../../Services/Depts/dept.service';
import { UserService } from '../../Services/Users/user.service';
import { AuthService } from '../../Services/Auth/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-admin-depts',
  standalone: true,
  imports: [ RouterLink, CommonModule, NavbarComponent, FooterComponent ],
  templateUrl: './admin-depts.component.html',
  styleUrl: './admin-depts.component.css'
})

export class AdminDeptsComponent {

  departments: department[]=[]

  constructor(private UserService: UserService, private DeptService: DeptService, private AuthService: AuthService){
    this.get_all_depts()
  }

  get_all_depts(){
    this.DeptService.get_all_depts
  }

  navigate_to_single_dept(){}
}
