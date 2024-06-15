import { Component } from '@angular/core';
import { Router,  RouterLink, RouterOutlet  } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-manager-sidebar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './manager-sidebar.component.html',
  styleUrl: './manager-sidebar.component.css'
})
export class ManagerSidebarComponent {

  constructor(private router: Router){}

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
