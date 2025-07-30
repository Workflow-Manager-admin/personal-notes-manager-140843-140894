import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Note } from '../models/note.model';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'notes_data';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class NoteService {
  private notes$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  constructor() {
    this.notes$.next(this.getNotesFromStorage());
  }

  // PUBLIC_INTERFACE
  getAll(): Observable<Note[]> {
    return this.notes$.asObservable();
  }

  // PUBLIC_INTERFACE
  getById(id: string): Observable<Note | undefined> {
    return of(this.notes$.getValue().find(n => n.id === id));
  }

  // PUBLIC_INTERFACE
  create(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Observable<Note> {
    const now = new Date().toISOString();
    const newNote: Note = {
      ...note,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now
    };
    const notes = [newNote, ...this.notes$.getValue()];
    this.updateStorage(notes);
    this.notes$.next(notes);
    return of(newNote);
  }

  // PUBLIC_INTERFACE
  update(id: string, update: Partial<Note>): Observable<Note | undefined> {
    const notes = this.notes$.getValue().map(n =>
      n.id === id
        ? { ...n, ...update, updatedAt: new Date().toISOString() }
        : n
    );
    this.updateStorage(notes);
    this.notes$.next(notes);
    return of(notes.find(n => n.id === id));
  }

  // PUBLIC_INTERFACE
  delete(id: string): Observable<boolean> {
    const notes = this.notes$.getValue().filter(n => n.id !== id);
    this.updateStorage(notes);
    this.notes$.next(notes);
    return of(true);
  }

  private updateStorage(notes: Note[]) {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }

  private getNotesFromStorage(): Note[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      }
      return [];
    } catch {
      return [];
    }
  }
}
