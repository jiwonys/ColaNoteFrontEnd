import { Component } from '@angular/core';
import { BoardService } from './board.service';
import { Board } from './Board'; // Import the Board model

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  board: Board | undefined;

  constructor(private boardService: BoardService) {}

  createBoard(): void {
    const board: Board = { name: 'Board 1' }; // Replace with actual board data
    this.boardService.createBoard(board).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getBoardByName(): void {
    const name = 'Board 1'; // Replace with the desired board name
    this.boardService.getBoardByName(name).subscribe(
      response => {
        this.board = response;
        console.log(this.board);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteBoardByName(): void {
    const name = 'Board 1'; // Replace with the name of the board to delete
    this.boardService.deleteBoardByName(name).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
