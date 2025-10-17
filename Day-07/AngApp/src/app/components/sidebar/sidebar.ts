import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <aside class="bg-dark text-white position-fixed start-0 top-0 vh-100 border-end p-3" style="width:200px; z-index:50;">
      <h5 class="mb-3">Menu</h5>
      <div class="bg-dark text-white list-group list-group-flush">
        <a class="bg-dark text-white list-group-item list-group-item-action" routerLink="/home">Home</a>

        <a class="bg-dark text-white list-group-item list-group-item-action" routerLink="/users">Users</a>
      </div>
    </aside>
  `,
})
export class Sidebar {}
