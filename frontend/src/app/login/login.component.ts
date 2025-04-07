import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login } from '../models/login.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]], 
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
  
    const LOGIN_QUERY = gql`
      query Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          id
          username
          email
          token
        }
      }
    `;
  
    const loginData = this.loginForm.value;
    this.loading = true;
  
    this.apollo
      .watchQuery({
        query: LOGIN_QUERY,
        variables: {
          username: loginData.username,
          password: loginData.password,
        },
      })
      .valueChanges
      .subscribe({
        next: (result: any) => {
          const user = result.data.login;
          localStorage.setItem('token', user.token);
          this.router.navigate(['/employee-list']);
        },
        error: (err) => {
          this.error = `Login failed: ${err.message}`;
          this.loading = false;
        }
      });
  }
  
}
