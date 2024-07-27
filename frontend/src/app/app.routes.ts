import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AdminEmployeesComponent } from './Components/admin-employees/admin-employees.component';
import { AdminDeptsComponent } from './Components/admin-depts/admin-depts.component';
import { NewDeptComponent } from './Components/new-dept/new-dept.component';
import { NewTaskComponent } from './Components/new-task/new-task.component';
import { ManagerDashboardComponent } from './Components/manager-dashboard/manager-dashboard.component';
import { ManagerProfileComponent } from './Components/manager-profile/manager-profile.component';
import { EmployeeProfileComponent } from './Components/employee-profile/employee-profile.component';
import { EmployeeDashboardComponent } from './Components/employee-dashboard/employee-dashboard.component';
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { UpdateTaskComponent } from './Components/update-task/update-task.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AdminTasksComponent } from './Components/admin-tasks/admin-tasks.component';
import { ManagerEmployeesComponent } from './Components/manager-employees/manager-employees.component';
import { UpdateDeptComponent } from './Components/update-dept/update-dept.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

    //admin routes
    {
        path: 'admin',
        component: AdminDashboardComponent,
        children: [
          { path: 'depts', component: AdminDeptsComponent },
          { path: 'profile/:user_id', component: EmployeeProfileComponent },
          { path: 'employees', component: AdminEmployeesComponent },
          { path: 'task/all', component: AdminTasksComponent },
          { path: 'dept/new', component: NewDeptComponent },
          { path: 'dept/update/:dept_id', component: UpdateDeptComponent },
          {path: 'task/update/:task_id', component: UpdateTaskComponent},
          { path: '', redirectTo: 'admindashboard', pathMatch: 'full' }
        ]
      },
      // { path: 'admindashboard', component: AdminDashboardComponent },

    //manager routes

    {
      path: 'manager',
      component: ManagerDashboardComponent,
      children: [
        {path: 'task/new', component: NewTaskComponent},
        {path: 'task/update/:task_id', component: UpdateTaskComponent},
        // {path: 'dash/:user_id', component: ManagerDashboardComponent},
        {path: 'profile/:user_id', component: ManagerProfileComponent},
        {path: 'profile/update/:user_id', component: UpdateProfileComponent},
        {path: 'dept/:dept_id/employees', component: ManagerEmployeesComponent},
        { path: '', redirectTo: 'managerdashboard', pathMatch: 'full' }
      ]
    },
    // { path: 'managerdashboard', component: ManagerDashboardComponent },

    //employee route
   
    {
      path: 'employee',
      component: EmployeeDashboardComponent,
      children: [
        {path: 'profile/:user_id', component: EmployeeProfileComponent},
        {path: 'task/update/:task_id', component: UpdateTaskComponent},
        {path: 'profile/update/:user_id', component: UpdateProfileComponent},
        { path: '', redirectTo: 'employeedashboard', pathMatch: 'full' }
      ]
    },
    // { path: 'employeedashboard', component: EmployeeDashboardComponent },

    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
