import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from './Board'; // Import the Board model

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private baseURL = 'http://localhost:8080/boards'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  createBoard(board: Board): Observable<any> {
    return this.http.post(`${this.baseURL}/createBoard`, board);
  }

  getBoardByName(name: string): Observable<Board> {
    return this.http.get<Board>(`${this.baseURL}/getBoardByName?name=${name}`);
  }

  deleteBoardByName(name: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/deleteBoardByName?name=${name}`);
  }
}
