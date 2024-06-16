import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ManagerSidebarComponent } from '../manager-sidebar/manager-sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, ManagerSidebarComponent, NavbarComponent, FooterComponent ],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})

export class ManagerDashboardComponent {

}
