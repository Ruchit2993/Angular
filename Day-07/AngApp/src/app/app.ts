import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  host: { 'class': 'bg-dark text-white' },
  template: `<router-outlet class="bg-dark text-white"></router-outlet>`
})
export class App {}
