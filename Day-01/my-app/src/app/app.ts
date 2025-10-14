import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  // template: `<p> This is indside the Template in the app.ts file </p>`,
  // styles: [`
  //   h1 {
  //     color: blue;
  //   }
  // `],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})



export class App {
  protected readonly title = signal('my-app');
  protected readonly msg = 'hi this msg inside the msg in the app.ts file';
}

