import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { NV } from '../../shared/nv';
import { Sidebar } from '../../components/sidebar/sidebar';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Sidebar, HttpClientModule],
  templateUrl: './register.html',
  styleUrls: []
})
export class Register {
  readonly nv = NV;
  form!: FormGroup; // initialize in constructor
  submitted = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    // build form here so fb is initialized
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      mobile: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      hobbies: this.fb.array(NV.hobbies.map(() => false)),
      address: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,16}')]],
      confirmPassword: ['', Validators.required]
    });
  }

  get hobbies(): FormArray { return this.form.get('hobbies') as FormArray; }

  onSubmit() {
    console.log('Register.onSubmit called', this.form.valid, this.form.value); // debug entry
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      console.log('Form invalid', this.form.errors, this.form);
      return;
    }

    const fv = this.form.value as Record<string, any>;

    if (fv['password'] !== fv['confirmPassword']) {
      console.log('Password mismatch');
      return;
    }

    const opts = fv['hobbies'] || [];
    const selectedHobbies = NV.hobbies.filter((_, i) => !!opts[i]);

    const user: User = {
      firstName: fv['firstName'] || undefined,
      middleName: fv['middleName'] || undefined,
      lastName: fv['lastName'] || undefined,
      mobile: fv['mobile'] || undefined,
      email: fv['email'], // validated above
      gender: fv['gender'] || undefined,
      hobbies: selectedHobbies,
      address: fv['address'] || undefined,
      country: fv['country'] || undefined,
      password: fv['password'] || undefined
    };

    const added = this.userService.addUser(user);
    try { localStorage.setItem('currentUser', JSON.stringify(added)); } catch (e) { console.warn(e); }
    this.router.navigate(['/users']);
  }

  // new: show/hide password for register form
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
