import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './froms/login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'contact', component: Contact },
    { path: '**', redirectTo: 'login' }
];
