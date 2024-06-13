import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMsg!:string;
  successMsg!: string;
  errorDiv = false
  successDiv = false

  storeToken(token: string){
    localStorage.setItem('token', token)
  }

  displaySuccess(msg:string, route:string, token: string){
    this.successMsg = msg;
          this.storeToken(token)
          this.successDiv = true
    setTimeout(() => {
      this.successDiv = false
      this.router.navigate([`${route}`])
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
