import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-note-search',
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule]
})
export class NoteSearchComponent {
  query: string = '';
  @Output() search = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.query);
  }
}
