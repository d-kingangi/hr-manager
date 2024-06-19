import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { department, departmentInfoResponse, allDepartmentsResponse } from '../../Interfaces/dept.interface';
import { DeptService } from '../../Services/Depts/dept.service';
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
  errorMsg!: string;
  successMsg!: string;
  errorDiv = false;
  successDiv = false;

  constructor( private DeptService: DeptService){
    this.get_all_depts()
  }

  get_all_depts() {
    this.DeptService.get_all_depts().subscribe(
      (response: allDepartmentsResponse) => {
        console.log('Raw response:', response);
        if (response.departments) {
          this.departments = response.departments;
          console.log('Departments fetched successfully:', this.departments);
        } else {
          console.error('Error fetching departments:', response.error);
          this.displayErrors('An error occurred while fetching departments. Please try again later.');
        }
      },
      (error) => {
        console.error('Error fetching departments:', error);
        this.displayErrors('An error occurred while fetching departments. Please try again later.');
      }
    );
  }

  displaySuccess(msg: string) {
    this.successMsg = msg;
    this.successDiv = true;
    setTimeout(() => {
      this.successDiv = false;
    }, 2000);
  }

  displayErrors(msg: string) {
    this.errorMsg = msg;
    this.errorDiv = true;
    setTimeout(() => {
      this.errorDiv = false;
    }, 2000);
  }

  navigate_to_single_dept(){}
}
