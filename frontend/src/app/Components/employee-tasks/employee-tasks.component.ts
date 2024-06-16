import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-tasks',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './employee-tasks.component.html',
  styleUrl: './employee-tasks.component.css'
})
export class EmployeeTasksComponent {

}
