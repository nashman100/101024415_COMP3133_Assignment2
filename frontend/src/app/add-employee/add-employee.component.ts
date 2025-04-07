import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule]
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.addEmployeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async onSubmit() {
    if (this.addEmployeeForm.valid) {
      const { first_name, last_name, email, department, designation, salary } = this.addEmployeeForm.value;
  
      const date_of_joining = new Date().toISOString().split('T')[0]; 
  
      console.log('Date of joining:', date_of_joining); 
  
      const formData = new FormData();
  
      const operations = {
        query: `mutation addNewEmployee($file: Upload!, $first_name: String!, $last_name: String!, $email: String!, $designation: String!, $salary: Float!, $date_of_joining: String!, $department: String!) {
          addNewEmployee(
            first_name: $first_name,
            last_name: $last_name,
            email: $email,
            designation: $designation,
            salary: $salary,
            date_of_joining: $date_of_joining,
            department: $department,
            file: $file
          ) {
            id
            first_name
            last_name
            email
            employee_photo
          }
        }`,
        variables: {
          first_name,
          last_name,
          email,
          department,
          designation,
          salary,
          date_of_joining,  
          file: null 
        }
      };
  
      formData.append('operations', JSON.stringify(operations));
  
      if (this.selectedFile) {
        const map = JSON.stringify({ 0: ['variables.file'] }); 
        formData.append('map', map); 
  
        formData.append('0', this.selectedFile, this.selectedFile.name);
      }
  
      try {
        console.log('Sending request with form data...');
        const response = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          body: formData
        });
  
        const result = await response.json();
        console.log('Response from server:', result);
  
        if (result.data) {
          console.log('Employee added successfully:', result.data);
          this.router.navigate(['/employee-list']).then(() => {
            window.location.reload();
          });
        } else {
          console.error('Error adding employee:', result.errors);
        }
      } catch (error) {
        console.error('Error submitting the form:', error);
      }
    }
  }
}
