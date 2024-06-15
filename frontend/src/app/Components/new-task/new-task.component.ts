import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { TaskService } from '../../Services/Tasks/task.service';
import { DeptService } from '../../Services/Depts/dept.service';
import { UserService } from '../../Services/Users/user.service';
import { task, taskInfoResponse, allTasksResponse } from '../../Interfaces/task.interface';
import { department, departmentInfoResponse, allDepartmentsResponse } from '../../Interfaces/dept.interface';
import { user, userInfoResponse, allUsersResponse } from '../../Interfaces/user.interface';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [ NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule, ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})

export class NewTaskComponent {
  newTaskForm!: FormGroup
  errorMsg!:string;
  successMsg!: string;
  errorDiv = false
  successDiv = false
  // tasks: task[] = []
  users: user[] = []
  departments: department[] = []

  constructor(private TaskService: TaskService, private UserService: UserService, private DeptService: DeptService, private fb:FormBuilder, private router: Router){
    this.newTaskForm = this.fb.group({
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

    this.get_departments()
    this.get_employees()
  }

  create_task(details: task){
    if(this.newTaskForm.valid){
      console.log('Task form details', details);
      this.TaskService.create_task(details).subscribe(res =>{
        console.log('Server response', res);
        if(res.message){
          this.displaySuccess(res.message)
        }
      })
    }
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
    this.newTaskForm.reset()
  }
}
