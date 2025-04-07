import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatProgressSpinnerModule]
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  console.log('Employee ID from route:', id);

  if (id) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (res) => {
        console.log('GraphQL response:', res);
        this.employee = res?.data?.searchEmployeeById;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching employee details:', err);
        this.isLoading = false;
      }
    });
  } else {
    console.warn('No employee ID found in route');
    this.isLoading = false;
  }
}

}
