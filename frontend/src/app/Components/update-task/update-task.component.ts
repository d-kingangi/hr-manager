import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { department, departmentInfoResponse, allDepartmentsResponse } from '../../Interfaces/dept.interface';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';
import { task, taskInfoResponse, allTasksResponse } from '../../Interfaces/task.interface';
import { AuthService } from '../../Services/Auth/auth.service';
import { DeptService } from '../../Services/Depts/dept.service';
import { UserService } from '../../Services/Users/user.service';
import { TaskService } from '../../Services/Tasks/task.service';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})

export class UpdateTaskComponent {
  updateTaskForm!: FormGroup
  task_id!: string

  successMsg!: string;
  errorMsg!: string

  errorDiv = false;
  successDiv = false

  departments: department[] = []
  users: user[] = []
  tasks: task[] = []

  constructor(private route: ActivatedRoute, private AuthService: AuthService,private UserService: UserService, private DeptService: DeptService, private TaskService: TaskService,private fb: FormBuilder, private router: Router){
    this.updateTaskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      due_date: ['', [Validators.required]],
      status: ['', [Validators.required]],
      assigned_to: ['', [Validators.required]],
      created_by: ['', [Validators.required]],
      estimated_effort: ['', [Validators.required]],
      completed_at: ['', [Validators]],
      labels: ['', [Validators.required]],
    })
    this.get_task_id();
    this.get_departments();
    this.get_employees();
  }

  get_task_id(){
    this.route.params.subscribe((params) => {
      this.task_id = params['task_id'];
      this.get_task_details();
    })
  }

  get_task_details(){
    this.TaskService.get_single_task(this.task_id).subscribe(res =>{
      // this.updateTaskForm.patchValue({
      //   title:
      //   description: res.task.
      //   due_date;
      //   status:
      //   assigned_to:
      //   created_by;
      //   estimated_effort: 
      //   completed_at:
      //   labels:
      // })
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

  get_employees(){
    this.UserService.get_all_users().subscribe(res=>{
      // if(res.user){
      //   res.user.forEach((this.user) =>{
      //     this.users.push(user)
      //   })
      // }
    })
  }

  update_task(){
    // this.TaskService.update_task(this.updateTaskForm.value, this.task_id).subscribe(res =>{
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
      // this.router.navigate(['/'])
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
    this.updateTaskForm.reset()
  }
  
}
