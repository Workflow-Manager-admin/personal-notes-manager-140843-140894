import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  @Input() filter: string = '';
  @Input() selectedNoteId?: string;
  @Output() selectNote = new EventEmitter<string>();
  @Output() createNote = new EventEmitter<void>();

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.noteService.getAll().subscribe(ns => {
      this.notes = ns;
    });
  }

  get filteredNotes() {
    const f = (this.filter || '').trim().toLowerCase();
    return f
      ? this.notes.filter(n =>
          n.title.toLowerCase().includes(f) ||
          n.content.toLowerCase().includes(f)
        )
      : this.notes;
  }

  select(id: string) {
    this.selectNote.emit(id);
  }

  create() {
    this.createNote.emit();
  }
}
