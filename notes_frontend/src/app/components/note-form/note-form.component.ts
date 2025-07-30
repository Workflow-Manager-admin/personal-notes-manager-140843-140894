import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule]
})
export class NoteFormComponent {
  @Input() note?: Note;
  @Output() save = new EventEmitter<Note>();
  @Output() cancel = new EventEmitter<void>();

  title: string = '';
  content: string = '';

  ngOnInit() {
    if (this.note) {
      this.title = this.note.title;
      this.content = this.note.content;
    }
  }

  saveNote() {
    if (this.title.trim() || this.content.trim()) {
      const result: Note = {
        ...(this.note ?? {id:'', createdAt:'', updatedAt:''}),
        title: this.title.trim(),
        content: this.content.trim(),
      };
      this.save.emit(result);
    }
  }

  cancelEdit() {
    this.cancel.emit();
  }
}
