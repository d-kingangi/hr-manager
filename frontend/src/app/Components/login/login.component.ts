import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../Services/Auth/auth.service';
import { loginDetails, loginResponse } from '../../Interfaces/login.interface';

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

  constructor(private AuthService: AuthService, private fb: FormBuilder, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  loginUser(details: loginDetails) {
    if (this.loginForm.valid) {
      this.AuthService.loginUser(details).subscribe(response => {
        console.log(response);
        if (response.message) {
          this.displaySuccess(response.message, '', response.token);
        }
      }, (error) => {
        console.error('Error:', error);
        this.displayErrors(error.error);
      });
    } else {
      this.displayErrors('Please fill in all the fields');
    }
  }

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
