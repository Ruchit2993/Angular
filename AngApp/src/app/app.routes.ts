import { Routes } from '@angular/router';
import { Login } from './froms/login/login';
import { Register } from './froms/register/register';
import { Users } from './users/users';
import { AddUser } from './users/add-user/add-user';
import { Contact } from './contact/contact';
import { Home } from './home/home';
import { About } from './about/about';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'users', component: Users },
  { path: 'add-user', component: AddUser },
  // { path: '**', redirectTo: 'login' },
  { path: 'contact', component: Contact },
  { path: 'about', component: About },
  { path: 'home', component: Home }
];
