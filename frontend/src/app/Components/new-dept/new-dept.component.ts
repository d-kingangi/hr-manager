import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DeptService } from '../../Services/Depts/dept.service';
import { UserService } from '../../Services/Users/user.service';
import { department, departmentInfoResponse, allDepartmentsResponse } from '../../Interfaces/dept.interface'
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';

@Component({
  selector: 'app-new-dept',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './new-dept.component.html',
  styleUrl: './new-dept.component.css'
})

export class NewDeptComponent {
  newDepartmentForm!: FormGroup
  errorMsg!:string;
  successMsg!: string;
  errorDiv = false
  successDiv = false
  users: user[] = []

  constructor(private DeptService: DeptService, private UserService: UserService, private fb:FormBuilder, private router: Router){
    this.newDepartmentForm = this.fb.group({
      name: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
    this.get_manager()
  }

  get_manager(){
    this.UserService.get_all_users().subscribe(res=>{
      // if(res.user){
      //   res.user.forEach((this.users)=>{
      //     this.user.push(user)
      //   })
      // }
    })
  }

  create_dept(details: department){
    if(this.newDepartmentForm.valid){
      console.log('Dept form details', details);
      this.DeptService.create_dept(details).subscribe(res => {
        console.log('Server response', res);
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
      // this.router.navigate(['/login'])
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
    this.newDepartmentForm.reset()
  }
}
