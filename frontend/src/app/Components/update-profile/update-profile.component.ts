import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../../Services/Users/user.service';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';
import { AuthService } from '../../Services/Auth/auth.service';
import { DeptService } from '../../Services/Depts/dept.service';
import { department, departmentInfoResponse, allDepartmentsResponse } from '../../Interfaces/dept.interface';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})

export class UpdateProfileComponent {
  updateProfileForm!: FormGroup;
  user_id!:string;

  successMsg!: string;
  errorMsg!: string

  errorDiv = false;
  successDiv = false

  departments: department[] = []
  users: user[]=[]

  constructor(private route: ActivatedRoute, private AuthService: AuthService, private UserService: UserService, private DeptService: DeptService, private fb: FormBuilder, private router: Router){
    this.updateProfileForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      dept_id: ['', [Validators.required]],
      password: ['', [Validators.required]],
      created_at: ['', [Validators.required]]
    })
    this.get_user_id();
    this.get_departments()
  }

  get_user_id(){
    this.route.params.subscribe((params) => {
      this.user_id = params['user_id'];
      this.get_user_details();
    })
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


  get_user_details(){
    this.UserService.get_single_user(this.user_id).subscribe(res =>{
      this.updateProfileForm.patchValue({
        first_name: res.users[0].first_name,
        last_name: res.users[0].last_name,
        phone: res.users[0].phone,
        email: res.users[0].email,
        role: res.users[0].role,
        dept_id: res.users[0].dept_id,
        password: res.users[0].password
      })
    })
  }


  update_profile(){
    // this.UserService.update_user(this.updateProfileForm.value, this.user_id).subscribe(res =>{
    //   if(res.sucess){
    //     this.displaySuccess(res)
    //   } else{
    //     this.displayErrors(res)
    //   }
    // })
  }

  displaySuccess(msg:string, route: string){
    this.successMsg = msg;
          this.successDiv = true;
          this.updateProfileForm.reset();
    setTimeout(() => {
      this.router.navigate([route])
      this.successDiv = false
    }, 2000);
  }

  displayErrors(msg: string){
    this.errorMsg = msg;
    this.errorDiv = true

    setTimeout(() => {
      this.errorDiv = false
    }, 2000);
  }
}
