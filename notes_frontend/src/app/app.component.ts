import { Component } from '@angular/core';
import { NotesPageComponent } from './pages/notes/notes.page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [NotesPageComponent]
})
export class AppComponent {}
