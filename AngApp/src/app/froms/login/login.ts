import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  passwordMismatch = false;

  // Data model bound to form inputs
  user = {
    firstName: '',
    middleName: '',
    lastName: '',
    mobile: '',
    email: '',
    gender: '',
    hobbies: [] as string[],
    address: '',
    country: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  toggleHobby(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
    if (checkbox.checked) {
      this.user.hobbies.push(value);  
    } else {
      this.user.hobbies = this.user.hobbies.filter(h => h !== value);
    }
  }

  onSubmit(formRef: NgForm) {
    this.passwordMismatch = false;

    if (this.user.password !== this.user.confirmPassword) {
      this.passwordMismatch = true;
    }

    if (formRef.valid && !this.passwordMismatch) {
      console.log('Form Submitted:', this.user);
      this.router.navigate(['/home']);
    } else {
      Object.values(formRef.controls).forEach((ctrl: any) => {
        try { ctrl.control?.markAllAsTouched(); } catch {}
      });
    }
    
  }

  // Helper used by the template to check if passwords match
  passwordsMatch(): boolean {
    return this.user.password === this.user.confirmPassword;
  }

  togglePassword(fieldId: string, event: Event) {
    const input = document.getElementById(fieldId) as HTMLInputElement;
    const icon = (event.currentTarget as HTMLElement).querySelector('i');
    if (input && icon) {
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
      }
    }
  }
}
