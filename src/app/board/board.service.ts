import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BoardService {
  private apiUrl = `http://localhost:8080/api/v1/boards`;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

    createStickyNote(note: any, boardId: number): Observable<any> {
      const url = `${this.apiUrl}/${boardId}/note`;
      return this.http.post<any>(url, note);
    }

    updateStickyNote(note: any, boardId: number, noteId: number): Observable<any> {
      const url = `${this.apiUrl}/${boardId}/note/${noteId}`;
      return this.http.put<any>(url, note);
    }

    getStickyNotes(boardId: number): Observable<any> {
      const url = 'http://localhost:8080/api/v1/boards/getboardbyid/'+ boardId;
      return this.http.get<any>(url);
    }

    deleteNote(boardId: number, noteId:number): Observable<any> {
      const url = `${this.apiUrl}/${boardId}/note/${noteId}`;
      return this.http.delete<any>(url);
    }
   }


