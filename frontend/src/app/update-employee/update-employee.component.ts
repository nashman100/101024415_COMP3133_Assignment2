import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule]
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId!: string;
  employee: any;
  
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      employee_photo: [null],
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployeeById(this.employeeId).subscribe((response) => {
      this.employee = response.data.searchEmployeeById;
      this.employeeForm.patchValue(this.employee);
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.employeeForm.patchValue({
        employee_photo: file,
      });
    }
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.employeeForm.value).forEach((key) => {
      formData.append(key, this.employeeForm.value[key]);
    });

    this.employeeService.updateEmployee(this.employeeId, formData).subscribe(
      (response) => {
        console.log('Employee updated successfully', response);
        this.router.navigate(['/employee-list']).then(() => {
          window.location.reload();
        }); 
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );
  }
}


