import { Routes } from '@angular/router';
import { NgModule } from '@angular/core'
import { LandingComponent } from './Components/landing/landing.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AdminEmployeesComponent } from './Components/admin-employees/admin-employees.component';
import { AdminManagersComponent } from './Components/admin-managers/admin-managers.component';
import { AdminDeptsComponent } from './Components/admin-depts/admin-depts.component';
import { NewDeptComponent } from './Components/new-dept/new-dept.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    //admin routes
    {path: 'employees', component: AdminEmployeesComponent},
    {path: 'managers', component: AdminManagersComponent},
    {path: 'depts', component: AdminDeptsComponent},
    {path: 'new-dept', component: NewDeptComponent}

];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
//   })

//   export class AppRoutingModule { }
