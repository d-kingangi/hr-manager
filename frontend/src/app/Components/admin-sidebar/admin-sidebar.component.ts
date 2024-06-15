import { Component } from '@angular/core';
import { Router,  RouterLink, RouterOutlet  } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})

export class AdminSidebarComponent {

  constructor(private router: Router){}

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
