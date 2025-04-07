import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatCardModule, MatIconModule]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading: boolean = true;
  error: string | null = null;

  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'department',
    'designation',
    'salary',
    'actions'
  ];

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    const GET_EMPLOYEES = gql`
      query {
        getAllEmployees {
          id
          first_name
          last_name
          email
          department
          designation
          salary
        }
      }
    `;

    this.apollo
      .watchQuery({
        query: GET_EMPLOYEES,
      })
      .valueChanges.subscribe({
        next: (result: any) => {
          this.employees = result.data.getAllEmployees;
          this.loading = false;
        },
        error: (err) => {
          this.error = `Error: ${err.message}`;
          this.loading = false;
        },
      });
  }

  editEmployee(employee: Employee) {
    this.router.navigate(['/update-employee', employee.id]);
    this.fetchEmployees();  
  }

  deleteEmployee(employee: Employee) {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      this.deleteEmployeeFromServer(employee.id);
    }
  }

  details(employee: Employee) {
    this.router.navigate(['/employee-details', employee.id]);
  }

  deleteEmployeeFromServer(employeeId: string) {
    const DELETE_EMPLOYEE = gql`
      mutation DeleteEmployee($id: ID!) {
        deleteEmployee(id: $id)
      }
    `;

    this.apollo
      .mutate({
        mutation: DELETE_EMPLOYEE,
        variables: {
          id: employeeId
        }
      })
      .subscribe({
        next: (result: any) => {
          this.fetchEmployees(); 
          alert('Employee deleted successfully!');
          window.location.reload();
        },
        error: (err) => {
          this.error = `Error deleting employee: ${err.message}`;
        }
      });
  }

  addEmployee() {
    this.router.navigate(['/add-employee']);
    this.fetchEmployees();
  }
}