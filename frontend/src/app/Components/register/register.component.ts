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
  imports: [ RouterLink, ReactiveFormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerUserForm!: FormGroup;
  errorMsg!:string;
  successMsg!: string;
  errorDiv = false
  successDiv = false
  departments: department[] = []

  constructor(private UserService: UserService, private DeptService: DeptService, private fb:FormBuilder, private router: Router){
    this.registerUserForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      dept_id: ['', [Validators.required]],
      password: ['', [Validators.required]],
      created_at: ['', [Validators.required]]
    })
    this.get_departments()
  }

  get_departments(){
    this.DeptService.get_all_depts().subscribe(res=>{
      // if(res.departments){
      //   res.departments.forEach((this.department) =>{
      //     this.departments.push(department)
      //   })
      // }
    })
  }

  register_user(details: user){
    if(this.registerUserForm.valid){
      console.log('Form details', details);
      this.UserService.register_user(details).subscribe(res =>{
        console.log('Server Response', res);
        if(res.message){
          this.displaySuccess(res.message)
        }
      })
    }
  }

  displaySuccess(msg:string){
    this.successMsg = msg;
    this.successDiv = true
    setTimeout(() => {
      this.successDiv = false
      this.router.navigate(['/login'])
    }, 2000);
  }

  displayErrors(msg: string){
    this.errorMsg = msg;
    this.errorDiv = true

    setTimeout(() => {
      this.errorDiv = false
    }, 2000);
  }

  resetForm(){
    this.registerUserForm.reset()
  }
}
