import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { NotesPageComponent } from './pages/notes/notes.page';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteSearchComponent } from './components/note-search/note-search.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    NotesPageComponent,
    NotesListComponent,
    NoteDetailComponent,
    NoteFormComponent,
    NoteSearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
