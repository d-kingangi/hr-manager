import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../../Services/Users/user.service';
import { DeptService } from '../../Services/Depts/dept.service';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';
import { department, departmentInfoResponse, allDepartmentsResponse } from '../../Interfaces/dept.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registerUserForm!: FormGroup;
  errorMsg!: string;
  successMsg!: string;
  errorDiv = false;
  successDiv = false;
  departments: department[] = [];
  // departments: any[] = []; 
  department: department | null = null
  departmentInfoResponse = {} as departmentInfoResponse

  constructor(private UserService: UserService, private DeptService: DeptService, private fb: FormBuilder, private router: Router) {
    this.registerUserForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      dept_id: ['', [Validators.required]],
      password: ['', [Validators.required]],
      created_at: ['', [Validators.required]]
    });
    this.get_departments();
  }


  // get_departments() {
  //   this.DeptService.get_all_depts().subscribe(
  //     (response: allDepartmentsResponse) => {
  //       console.log('Raw response:', response);
  //       if (response.departments) {
  //         this.departments = response.departments;
  //         console.log('Departments fetched successfully:', this.departments);
  //       } else {
  //         console.error('Error fetching departments:', response.error);
  //         this.displayErrors('An error occurred while fetching departments. Please try again later.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching departments:', error);
  //       this.displayErrors('An error occurred while fetching departments. Please try again later.');
  //     }
  //   );
  // }


  get_departments(): void {
    this.DeptService.get_all_depts().subscribe(
      (res: {departments: department[] }) =>{
        if(res && Array.isArray(res.departments)){
          this.departments = res.departments
        } else{
          console.error('Unexpected response structure:', res);
        }
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    )
  }

  register_user() {
    if (this.registerUserForm.invalid) {
      return;
    }

    this.UserService.register_user(this.registerUserForm.value).subscribe(
      (res) => {
        if (res.error) {
          this.errorMsg = res.error;
          this.successMsg = '';
        } else {
          this.successMsg = 'User registered successfully';
          this.errorMsg = '';
        }
      },
      (error) => {
        console.error('Error registering user:', error);
        this.errorMsg = 'Failed to register user';
        this.successMsg = '';
      }
    );
  }

  displaySuccess(msg: string) {
    this.successMsg = msg;
    this.successDiv = true;
    setTimeout(() => {
      this.successDiv = false;
      this.router.navigate(['/login']);
    }, 2000);
  }

  displayErrors(msg: string) {
    this.errorMsg = msg;
    this.errorDiv = true;
    setTimeout(() => {
      this.errorDiv = false;
    }, 2000);
  }

  resetForm() {
    this.registerUserForm.reset();
  }
}
