import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { department,departmentInfoResponse, allDepartmentsResponse } from '../../Interfaces/dept.interface';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';
import { DeptService } from '../../Services/Depts/dept.service';
import { UserService } from '../../Services/Users/user.service';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-update-dept',
  standalone: true,
  imports: [ RouterLink, ReactiveFormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './update-dept.component.html',
  styleUrl: './update-dept.component.css'
})

export class UpdateDeptComponent {
  updateDeptForm!: FormGroup
  dept_id!: string

  successMsg!: string;
  errorMsg!: string

  errorDiv = false;
  successDiv = false

  departments: department[] = []
  users: user[] = []

  constructor(private route: ActivatedRoute, private AuthService: AuthService, private UserService: UserService, private DeptService: DeptService, private fb: FormBuilder, private router: Router){
    this.updateDeptForm = this.fb.group({
      name: ['', [Validators.required]],
      manager: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
    this.get_manager()
    this.get_dept_details()
    this.get_dept_id()
  }

  get_dept_id(){
    this.route.params.subscribe((params) => {
      this.dept_id = params['dept_id'];
      this.get_dept_details();
    })
  }

  get_dept_details(){}

  get_manager(){
    this.UserService.get_all_users().subscribe(res=>{
      // if(res.user){
      //   res.user.forEach((this.users)=>{
      //     this.user.push(user)
      //   })
      // }
    })
  }

  update_dept(){
    // this.DeptService.update_dept(this.updateDeptForm.value, this.dept_id).subsribe(res =>{
    //   if(res.sucess){
    //     this.displaySuccess(res)
    //   }else{
    //     this.displayErrors(res)
    //   }
    // })
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
    this.updateDeptForm.reset()
  }
}
