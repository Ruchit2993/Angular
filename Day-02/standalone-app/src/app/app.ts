import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [RouterModule, Home, About],
  template: `
    <h1>Welcome to Standalone Angular App!</h1>
    <nav>
      <a routerLink="">Home</a> |
      <a routerLink="about">About</a>
    </nav>
    <hr>
    <router-outlet></router-outlet>
  `,
  // templateUrl: './app.html'
})
export class App {}
