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
  constructor(private boardService: BoardService) { }


  ngOnInit() {
      this.loadStickyNotes();
  }

  loadStickyNotes() {
      this.boardService.getStickyNotes(this.board_id).subscribe((board) => {
        this.stickyNotes = board.notes;
        console.log(this.stickyNotes);
      });
  }

  createStickyNote() {
      const newNote = {
        id : this.id,
        title: this.title,
        info: this.info,
        xaxis: 0, // Default x-axis position
        yaxis: 0, // Default y-axis position
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
    //console.log(event);
        const distance = event.distance;
            const stickyNoteWidth = 200; // The width of your sticky note
            const stickyNoteHeight = 100; // The height of your sticky note

            // Calculate the new x and y positions based on the mouse position
            const newX = distance.x;
            const newY = distance.y;

            // Update the noteCopy object with the new position
            this.noteCopy = { ...note };

            if(newX + this.initialNoteX < 0) {
              this.noteCopy.xaxis = 0;
            }else{
              this.noteCopy.xaxis = (newX + this.initialNoteX) ;

            }

            if(newY + this.initialNoteY < 0) {
              this.noteCopy.yaxis = 0;
            }else{
              this.noteCopy.yaxis = (newY + this.initialNoteY) ;

            }


            this.updateStickyNote(this.noteCopy); // Update the sticky note position in the backend
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


