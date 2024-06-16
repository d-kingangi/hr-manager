import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EmployeeSidebarComponent } from '../employee-sidebar/employee-sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [ RouterOutlet, RouterLink, EmployeeSidebarComponent, NavbarComponent, FooterComponent],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})

export class EmployeeDashboardComponent {

}
