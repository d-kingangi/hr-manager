import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Route } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ RouterLink, AdminSidebarComponent, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent {

}
