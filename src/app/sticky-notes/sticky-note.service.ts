import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StickyNoteService {
  private apiUrl = `localhost:8080/api/v1/boards/getboardbyid/1`;

  constructor(private http: HttpClient) { }

  getStickyNotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


}
