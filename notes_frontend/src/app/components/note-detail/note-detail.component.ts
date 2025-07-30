import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.model';
import { NoteFormComponent } from '../note-form/note-form.component';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
  standalone: true,
  imports: [CommonModule, NoteFormComponent]
})
export class NoteDetailComponent implements OnInit {
  @Input() noteId!: string;
  @Input() note?: Note;
  @Output() edit = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<string>();
  @Output() back = new EventEmitter<void>();

  showEdit = false;

  ngOnInit() {}

  enableEdit() {
    this.showEdit = true;
  }

  onUpdate(note: Note) {
    this.edit.emit(note);
    this.showEdit = false;
  }

  deleteNote() {
    this.delete.emit(this.noteId);
  }

  goBack() {
    this.back.emit();
  }
}
