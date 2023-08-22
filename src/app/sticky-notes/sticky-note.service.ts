import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StickyNoteService {
  private apiUrl = `http://localhost:8080/api/v1/boards`;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  updateStickyNote(note: any, boardId: number, noteId: number): Observable<any> {
    const url = `${this.apiUrl}/${boardId}/note/${noteId}`;
    return this.http.put<any>(url, note);
  }

  deleteNote(boardId: number, noteId:number): Observable<any> {
    const url = `${this.apiUrl}/${boardId}/note/${noteId}`;
    return this.http.delete<any>(url);
  }
}
