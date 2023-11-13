import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BoardService } from './board.service'
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
  stickyNotes: any[] = [];
  @Input() id: number = -1;
  @Input() title: string = '';
  @Input() info: string = '';
  @Output() positionChange = new EventEmitter<{ x: number, y: number }>();
  noteX : number = 0;
  noteY : number = 0;
  initialNoteX: number = 0;
  initialNoteY: number = 0;
  board_id: number = 1;
  noteCopy : any;
  boardName: any;
  constructor(private boardService: BoardService) { }


  ngOnInit() {
      this.loadStickyNotes();
  }

  loadStickyNotes() {
      this.boardService.getStickyNotes(this.board_id).subscribe((board) => {
        this.boardName = board.name;
        this.stickyNotes = board.notes;
        console.log(this.stickyNotes);
      });
  }

  createStickyNote() {
      const newNote = {
        id : this.id,
        title: this.title,
        info: this.info,
        xaxis: 0,
        yaxis: 0,
      };

      this.boardService.createStickyNote(newNote, 1).subscribe((createdNote) => {
        this.stickyNotes.push(createdNote);
      });
    }

    updateStickyNote(note: any ) {
      this.boardService.updateStickyNote(note,1 ,note.id).subscribe(() => {
      console.log("successful");
      });
    }

    positionStartChange(event:any, note:any){
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

        if (newX + this.initialNoteX < 0) {
            note.xaxis = 0;
        } else {
            note.xaxis = newX + this.initialNoteX;
        }

        if (newY + this.initialNoteY < 0) {
            note.yaxis = 0;
        } else {
            note.yaxis = newY + this.initialNoteY;
        }

        const index = this.stickyNotes.findIndex(stickyNote => stickyNote.id === note.id);
        if (index !== -1) {
            this.stickyNotes[index] = { ...note };
        }

        this.updateStickyNote(note);
    }


      delete(note: any) {
        this.boardService.deleteNote(this.board_id, note.id).subscribe(() => {
           // Find the index of the deleted note in the stickyNotes array
           const index = this.stickyNotes.findIndex(stickyNote => stickyNote.id === note.id);
           if (index !== -1) {
             this.stickyNotes.splice(index, 1);
           }
           });

      }


}


