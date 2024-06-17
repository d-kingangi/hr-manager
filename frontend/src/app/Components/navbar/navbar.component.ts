import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/Auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  constructor(private router: Router, private AuthService: AuthService){
    this.check_auth()
  }

  isLogged: boolean = false;
  first_name!: string
  last_name!: string
  role!: string
  token = this.getToken()

  getToken(){
    if(typeof window !== 'undefined'){
      return localStorage?.getItem('token') as string
    }else{
      return null
    }
  }


  isTokenAvailable(): boolean {
    try {
        if (typeof window !== 'undefined') {
            const token = localStorage?.getItem('token');
            return !!token;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error accessing localStorage:', error);
        return false;
    }
  }

  check_auth(){
    const token = this.getToken()
    if(token != null){
      this.AuthService.checkUserDetails(token).subscribe(res =>{
        if(res.user[0]){
          this.isLogged = true
          this.first_name = res.user[0].first_name
          this.last_name = res.user[0].last_name
          this.role = res.user[0].role
        }
      })
    } else{
      this.isLogged = false
    }
  }

  logout(){
    if(typeof window !== 'undefined'){
      localStorage?.clear();
      this.router.navigate(['/login'])
    } 
  }
}
