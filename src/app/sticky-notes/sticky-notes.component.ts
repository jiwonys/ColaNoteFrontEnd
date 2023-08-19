import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { StickyNoteService } from './sticky-note.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

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

  positionsLoaded: boolean = false;
  noteCopy : any;
  constructor(private stickyNoteService: StickyNoteService) { }

  ngOnInit() {
    this.loadStickyNotes();
  }

  loadStickyNotes() {
    this.stickyNoteService.getStickyNotes(1).subscribe((board) => {
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
//   alert("Making changes" + note.title + note.info);

    this.stickyNoteService.updateStickyNote(note,1 ,note.id).subscribe(() => {
//       alert("a request has been sent with the information of note title:"  + note.title + "and note info" + note.info)
    });
  }
  positionStartChange(event:any, note:any){
  console.log(event);
  console.log(event.event.clientX);
  console.log(event.event.clientY);

    this.mouseClickX = event.event.clientX - note.xaxis;
    this.mouseClickY = event.event.clientY - note.yaxis;
    this.noteX = note.xaxis;
    this.noteY = note.yaxis;
  }

  onPositionChange(event: any, note: any) {
  console.log(event);
      const dropPoint = event.dropPoint;
          const stickyNoteWidth = 200; // The width of your sticky note
          const stickyNoteHeight = 100; // The height of your sticky note

          // Calculate the new x and y positions based on the mouse position
          const newX = dropPoint.x;
          const newY = dropPoint.y;

          // Update the noteCopy object with the new position
          this.noteCopy = { ...note };

          this.noteCopy.xaxis = newX ;
          this.noteCopy.yaxis = newY ;

          this.updateStickyNote(this.noteCopy); // Update the sticky note position in the backend
  }

}
