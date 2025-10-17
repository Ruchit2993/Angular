import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { ROUTES } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(ROUTES),
    importProvidersFrom(HttpClientModule)
  ]
}).catch(err => console.error(err));
