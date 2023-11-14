import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router} from '@angular/router';
import { BoardService } from './board.service';
import { NewBoardDialogComponent } from '../new-board-dialog/new-board-dialog.component';
import { MyBoardDialogComponent } from '../my-board-dialog/my-board-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  stickyNotes: any[] = [];
  @Input() id: number = -1;
  @Input() title: string = '';
  @Input() info: string = '';
  @Output() positionChange = new EventEmitter<{ x: number, y: number }>();
  noteX: number = 0;
  noteY: number = 0;
  initialNoteX: number = 0;
  initialNoteY: number = 0;
  board_id: number = 1;
  noteCopy: any;
  boardName: any;

  constructor(private boardService: BoardService, public dialog: MatDialog, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.board_id = idParam ? +idParam : 1;
      this.loadStickyNotes();
    });
  }

  loadStickyNotes() {
      this.boardService.getStickyNotes(this.board_id).subscribe((board) => {
        this.boardName = board.name;
        this.stickyNotes = board.notes;

        this.router.navigate(['/board', this.board_id]);

        console.log(this.stickyNotes);
      });
    }

  createStickyNote() {
    const newNote = {
      title: "",
      info: "",
    };

    this.boardService.createStickyNote(newNote, this.board_id).subscribe(() => {
      console.log("created a new sticky");
      this.loadStickyNotes();
    });
  }

  updateStickyNote(note: any) {
    this.boardService.updateStickyNote(note, this.board_id, note.id).subscribe(() => {
    });
  }

  positionStartChange(event: any, note: any) {
    this.initialNoteX = note.xaxis;
    this.initialNoteY = note.yaxis;
    this.noteX = note.xaxis;
    this.noteY = note.yaxis;
  }

  onPositionChange(event: any, note: any) {
    const distance = event.distance;
    const stickyNoteWidth = 200;
    const stickyNoteHeight = 100;

    const newX = distance.x;
    const newY = distance.y;

    note.xaxis = newX + this.initialNoteX < 0 ? 0 : newX + this.initialNoteX;
    note.yaxis = newY + this.initialNoteY < 0 ? 0 : newY + this.initialNoteY;

    const index = this.stickyNotes.findIndex(stickyNote => stickyNote.id === note.id);
    if (index !== -1) {
      this.stickyNotes[index] = { ...note };
    }

    this.updateStickyNote(note);
  }

  delete(note: any) {
    this.boardService.deleteNote(this.board_id, note.id).subscribe(() => {
      const index = this.stickyNotes.findIndex(stickyNote => stickyNote.id === note.id);
      if (index !== -1) {
        this.stickyNotes.splice(index, 1);
      }
    });
  }

  createBoard(newBoardName: string) {
    const newBoard = {
      name: newBoardName,
    };
    console.log("creating board");
    this.boardService.createBoard(newBoard).subscribe((createdBoard: any) => {
      this.board_id = createdBoard.id;
      this.loadStickyNotes();
    });
  }




  addBoardToUser(){
    this.boardService.addBoardToUser(this.board_id).subscribe(
      (result) => {
        alert("This Board has been added to your list");
      },
      (error) => {
        alert("This board is already in your boards!");
      }
    );
  }

  openNewBoardDialog(): void {
    const dialogRef = this.dialog.open(NewBoardDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Board name:', result);
        this.createBoard(result);
      }
    });
  }


   openMyBoardDialog(): void {
       this.boardService.getBoards().subscribe(
         (boards: any[]) => {
           const simplifiedBoards = boards.map(board => ({
             id: board.id,
             name: board.name
           }));

           this.dialog.open(MyBoardDialogComponent, {
             width: '600px',
             data: simplifiedBoards
           }).afterClosed().subscribe((selectedBoardId: number) => {
             if (selectedBoardId) {
               // Navigate to the selected board
               this.router.navigate(['/board', selectedBoardId]);
             }
           });
         },
         (error) => {
           console.error('Error fetching boards:', error);
         }
       );
     }

}
