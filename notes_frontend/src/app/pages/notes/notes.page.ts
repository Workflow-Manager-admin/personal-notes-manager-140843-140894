import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';
import { CommonModule } from '@angular/common';
import { NotesListComponent } from '../../components/notes-list/notes-list.component';
import { NoteDetailComponent } from '../../components/note-detail/note-detail.component';
import { NoteSearchComponent } from '../../components/note-search/note-search.component';
import { NoteFormComponent } from '../../components/note-form/note-form.component';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.css'],
  standalone: true,
  imports: [CommonModule, NotesListComponent, NoteDetailComponent, NoteSearchComponent, NoteFormComponent]
})
export class NotesPageComponent {
  searchQuery: string = '';
  selectedNoteId: string | null = null;
  creatingNew: boolean = false;

  constructor(private noteService: NoteService) {}

  onSearch(q: string) {
    this.searchQuery = q;
  }

  selectNote(noteId: string) {
    this.selectedNoteId = noteId;
    this.creatingNew = false;
  }

  createNote() {
    this.selectedNoteId = null;
    this.creatingNew = true;
  }

  editNote(noteUpdate: Partial<Note>) {
    if (!noteUpdate.id) return;
    this.noteService.update(noteUpdate.id, noteUpdate).subscribe();
  }

  deleteNote(noteId: string) {
    this.noteService.delete(noteId).subscribe(() => {
      this.deselectNote();
    });
  }

  deselectNote() {
    this.selectedNoteId = null;
    this.creatingNew = false;
  }

  saveNewNote(noteInfo: Partial<Note>) {
    this.noteService.create({
      title: noteInfo.title || '',
      content: noteInfo.content || ''
    }).subscribe(note => {
      this.selectedNoteId = note.id;
      this.creatingNew = false;
    });
  }

  cancelCreate() {
    this.selectedNoteId = null;
    this.creatingNew = false;
  }
}
