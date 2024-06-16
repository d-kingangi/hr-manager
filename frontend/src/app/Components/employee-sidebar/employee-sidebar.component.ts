import { Component } from '@angular/core';
import { Router,  RouterLink, RouterOutlet  } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-employee-sidebar',
  standalone: true,
  imports: [Router, RouterLink, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './employee-sidebar.component.html',
  styleUrl: './employee-sidebar.component.css'
})

export class EmployeeSidebarComponent {

  constructor(private router: Router){}

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
