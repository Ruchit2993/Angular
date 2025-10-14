import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  // Form model
  credentials = {
    email: '',
    password: '',
    rememberMe: false,
  };

  submitted = false;
  submittedData: any = null;

  onSubmit(form: any) {
    this.submitted = true;
    // In a real application, you would send credentials to a backend service
    this.submittedData = {
      email: this.credentials.email,
      rememberMe: this.credentials.rememberMe,
    };
    console.log('Login Form Submitted!', this.credentials);
    console.log('Form Valid:', form);
  }

  onReset(form: any) {
    form.reset();
    this.submitted = false;
    this.submittedData = null;
    this.credentials = {
      email: '',
      password: '',
      rememberMe: false,
    };
  }
}
