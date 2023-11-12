import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StickyNoteService {
  private apiUrl1 = environment.apiurl;
  private apiUrl2 = `/api/v1/board`;
  private apiUrl = apiUrl1 + apiUrl2;
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
