import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Sidebar],
  template: `
    <app-sidebar></app-sidebar>
    <div style="margin-left:210px;padding:20px;">
      <h2>Welcome Home</h2>
    </div>
  `
})
export class Home {}
