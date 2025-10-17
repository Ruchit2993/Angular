import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NV } from '../../shared/nv';
import { UserService } from '../../services/user.service';
import { Sidebar } from '../../components/sidebar/sidebar';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Sidebar, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  // Replace template-driven model with reactive form fields
  form: FormGroup;
  submitted = false;
  userNotFound = false;
  authError = '';

  // expose NV for template usage (labels, placeholders, button text, lists)
  readonly nv = NV;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    // build reactive form with validators
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.form.markAllAsTouched();
    this.userNotFound = false;
    this.authError = '';

    if (this.form.invalid) return;

    const fv = this.form.value;
    const user = this.userService.findByEmail(fv.email);
    if (!user) {
      this.userNotFound = true;
      return;
    }
    if (user.password !== fv.password) {
      this.authError = 'Invalid password';
      return;
    }
    // success: store current user and go to users page
    try { localStorage.setItem('currentUser', JSON.stringify(user)); } catch {}
    this.router.navigate(['/users']);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  // restore togglePassword used by template
  togglePassword(fieldId: string, event: Event) {
    const input = document.getElementById(fieldId) as HTMLInputElement | null;
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
