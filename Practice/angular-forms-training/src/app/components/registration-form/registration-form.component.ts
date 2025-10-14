import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  // Form model
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: null as number | null,
    gender: '',
    country: '',
    agreeToTerms: false,
    newsletter: false
  };

  countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'India',
    'Germany',
    'France',
    'Japan',
    'Other'
  ];

  submitted = false;
  submittedData: any = null;

  onSubmit(form: any) {
    this.submitted = true;
    this.submittedData = { ...this.user };
    console.log('Form Submitted!', this.user);
    console.log('Form Valid:', form.valid);
    console.log('Form Value:', form.value);
  }

  onReset(form: any) {
    form.reset();
    this.submitted = false;
    this.submittedData = null;
    this.user = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: null,
      gender: '',
      country: '',
      agreeToTerms: false,
      newsletter: false
    };
  }

  // Custom validation method to check if passwords match
  passwordsMatch(): boolean {
    return this.user.password === this.user.confirmPassword;
  }
}

