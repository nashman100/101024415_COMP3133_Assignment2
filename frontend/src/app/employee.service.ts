import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo, private http: HttpClient) {}

  // Retrieve employee by ID
  getEmployeeById(employeeId: string): Observable<any> {
    const GET_EMPLOYEE = gql`
      query SearchEmployeeById($id: ID!) {
        searchEmployeeById(id: $id) {
          id
          first_name
          last_name
          email
          department
          designation
          salary
          employee_photo
        }
      }
    `;

    return this.apollo.watchQuery({
      query: GET_EMPLOYEE,
      variables: {
        id: employeeId,
      },
    }).valueChanges;
  }

  updateEmployee(employeeId: string, formData: FormData): Observable<any> {
    const file = formData.get('employee_photo');
  
    const input: any = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      salary: parseFloat(formData.get('salary') as string),
      department: formData.get('department'),
      designation: formData.get('designation'),
    };
  
    const hasFile = file instanceof File && file.name;
  
    if (hasFile) {
      input.file = null;
    }
  
    const operations = JSON.stringify({
      query: `
        mutation($id: ID!, $input: UpdateEmployeeInput!) {
          updateEmployeeById(id: $id, input: $input) {
            id
            first_name
            last_name
            email
            salary
            department
            designation
            employee_photo
          }
        }
      `,
      variables: {
        id: employeeId,
        input: input,
      },
    });
  
    const uploadForm = new FormData();
    uploadForm.append('operations', operations);
  
    if (hasFile) {
      uploadForm.append('map', JSON.stringify({ '0': ['variables.input.file'] }));
      uploadForm.append('0', file as File, (file as File).name);
    } else {
      uploadForm.append('map', JSON.stringify({}));
    }
  
    return this.http.post('http://localhost:4000/graphql', uploadForm);
  }  
}
