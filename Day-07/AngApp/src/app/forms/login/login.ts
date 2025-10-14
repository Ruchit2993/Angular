import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NV } from '../../shared/nv';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  // Replace template-driven model with reactive form fields
  loginForm: FormGroup;
  submitted = false;

  // hobby labels to map FormArray indices to names (from NV)
  hobbiesLabels = NV.hobbies;

  // expose NV for template usage (labels, placeholders, button text, lists)
  readonly nv = NV;

  constructor(private router: Router, private fb: FormBuilder) {
    // build reactive form with validators and a form-level password match validator
    this.loginForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      hobbies: this.fb.array(this.hobbiesLabels.map(() => false)),
      address: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,16}')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    }, { validators: this.passwordsMatchValidator() });
  }

  // Form-level validator for password match
  private passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const pw = group.get('password')?.value;
      const cpw = group.get('confirmPassword')?.value;
      return pw && cpw && pw !== cpw ? { passwordMismatch: true } : null;
    };
  }

  // getters for template convenience
  get firstName() { return this.loginForm.get('firstName'); }
  get middleName() { return this.loginForm.get('middleName'); }
  get lastName() { return this.loginForm.get('lastName'); }
  get mobile() { return this.loginForm.get('mobile'); }
  get email() { return this.loginForm.get('email'); }
  get gender() { return this.loginForm.get('gender'); }
  get hobbies(): FormArray { return this.loginForm.get('hobbies') as FormArray; }
  get address() { return this.loginForm.get('address'); }
  get country() { return this.loginForm.get('country'); }
  get password() { return this.loginForm.get('password'); }
  get confirmPassword() { return this.loginForm.get('confirmPassword'); }

  // maintain the togglePassword UI functionality
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

  // helper used by template to check if passwords match
  passwordsMatch(): boolean {
    return !this.loginForm.hasError('passwordMismatch');
  }

  // toggle hobby at given index (keeps parity with previous toggle behaviour)
  toggleHobbyByIndex(index: number) {
    const control = this.hobbies.at(index);
    control.setValue(!control.value);
  }

  onSubmit() {
    this.submitted = true;
    // mark everything touched to show validation messages
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid && !this.loginForm.hasError('passwordMismatch')) {
      // build user object similar to previous template-driven model
      const formValue = this.loginForm.value;
      const selectedHobbies = this.hobbiesLabels.filter((_, i) => formValue.hobbies[i]);

      const user = {
        firstName: formValue.firstName,
        middleName: formValue.middleName,
        lastName: formValue.lastName,
        mobile: formValue.mobile,
        email: formValue.email,
        gender: formValue.gender,
        hobbies: selectedHobbies,
        address: formValue.address,
        country: formValue.country,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword
      };

      console.log('Form Submitted:', user);
      this.router.navigate(['/home']);
    } else {
      // invalid; keep submitted true so template shows validation state
    }
  }
}
