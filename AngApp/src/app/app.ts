import { Component, OnDestroy, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Header } from './common/header/header';
import { Footer } from './common/footer/footer';
import { Sidebar } from './common/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Footer, Sidebar],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnDestroy {
  protected readonly title = signal('AngApp');
  year = new Date().getFullYear();

  showLayout = false;
  private routerSub!: Subscription;

  constructor(private router: Router /*, other injections if any */) {
    // set initial visibility and subscribe to navigation events
    this.updateLayoutVisibility(router.url);
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.updateLayoutVisibility(e.urlAfterRedirects ?? e.url));
  }

  private updateLayoutVisibility(url: string) {
    const path = (url || '').split('?')[0].replace(/^\/+/, '');
    // hide header/footer on login and register routes (and empty root redirect)
    this.showLayout = !!path && !['login', 'register'].includes(path);
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
