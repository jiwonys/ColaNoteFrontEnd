import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { StickyNoteService } from './sticky-note.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-sticky-notes',
  templateUrl: './sticky-notes.component.html',
  styleUrls: ['./sticky-notes.component.css']
})
export class StickyNotesComponent implements OnInit {
  stickyNotes: any[] = [];

  @Input() id: number = -1;
  @Input() title: string = '';
  @Input() info: string = '';
  @Output() positionChange = new EventEmitter<{ x: number, y: number }>();
  noteX : number = 0;
  noteY : number = 0;
  mouseClickX: number = 0;
  mouseClickY: number = 0;
  board_id: number = 1;


  positionsLoaded: boolean = false;
  noteCopy : any;
  constructor(private stickyNoteService: StickyNoteService) { }

  ngOnInit() {
    this.loadStickyNotes();
  }

  loadStickyNotes() {
    this.stickyNoteService.getStickyNotes(this.board_id).subscribe((board) => {
      this.stickyNotes = board.notes;
    });
  }
  //fdasf

  createStickyNote() {
    const newNote = {
      id : this.id,
      title: this.title,
      info: this.info,

      xaxis: 0, // Default x-axis position
      yaxis: 0, // Default y-axis position
    };

    this.stickyNoteService.createStickyNote(newNote, 1).subscribe((createdNote) => {
      this.stickyNotes.push(createdNote);
    });
  }

  updateStickyNote(note: any ) {
    this.stickyNoteService.updateStickyNote(note,1 ,note.id).subscribe(() => {
    console.log("successful");
    });
  }
  positionStartChange(event:any, note:any){
  //console.log(event);
  //console.log(event.event.clientX);
  //console.log(event.event.clientY);

    this.mouseClickX = note.xaxis;
    this.mouseClickY = note.yaxis;
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

          if(newX + this.mouseClickX < 0) {
            this.noteCopy.xaxis = 0;
          }else{
            this.noteCopy.xaxis = (newX + this.mouseClickX) ;

          }

          if(newY + this.mouseClickY < 0) {
            this.noteCopy.yaxis = 0;
          }else{
            this.noteCopy.yaxis = (newY + this.mouseClickY) ;

          }


          this.updateStickyNote(this.noteCopy); // Update the sticky note position in the backend
  }

}
