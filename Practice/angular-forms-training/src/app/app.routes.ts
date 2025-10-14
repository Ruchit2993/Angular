import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'contact', component: ContactFormComponent },
  { path: '**', redirectTo: '' }
];

