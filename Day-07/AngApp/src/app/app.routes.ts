import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // use lazy dynamic imports for standalone components
  {
    path: 'login',
    loadComponent: () => import('./forms/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users').then(m => m.Users)
  },

  { path: '**', redirectTo: 'login' }
];
