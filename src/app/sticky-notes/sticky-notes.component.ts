import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { StickyNoteService } from './sticky-note.service';
import { DragDropModule, CdkDragEnd, DragRef, CdkDrag } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-sticky-notes',
  templateUrl: './sticky-notes.component.html',
  styleUrls: ['./sticky-notes.component.css'],
})
export class StickyNotesComponent implements OnInit {
  stickyNotes: any[] = [];

  @Input() id: number = -1;
  @Input() title: string = '';
  @Input() info: string = '';
  @Output() positionChange = new EventEmitter<{ x: number, y: number }>();

  constructor(private stickyNoteService: StickyNoteService) { }

  ngOnInit() {
    this.loadStickyNotes();
  }

  loadStickyNotes() {
    this.stickyNoteService.getStickyNotes(1).subscribe((board) => {
      this.stickyNotes = board.notes;
      console.log(this.stickyNotes);
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
   alert("Making changes" + note.title + note.info);
    this.stickyNoteService.updateStickyNote(note,1 ,note.id).subscribe(() => {
//       alert("a request has been sent with the information of note title:"  + note.title + "and note info" + note.info)
    });
  }

  onPositionChange(event: any, note: any) {
   alert("updated position : " + event.source.getFreeDragPosition());

//     const { x, y } = event.source.dropPosition(); // Get the new position of the sticky note
    const { x, y } = event.source.getFreeDragPosition(); // Get the new position of the sticky note
    //const { x, y } = this.getPosition(note); // Get the new position of the sticky note
    alert("updated position : " + x + ", " + y);
//     note.xaxis = left;
//     note.yaxis = top;
    note.xaxis = x;
    note.yaxis = y;
    alert("X: " + note.xaxis +", "+x);

    //[cdkDragFreeDragPosition]="dragPosition"

    this.updateStickyNote(note); // Update the sticky note position in the backend
  }

  /*
    sticky-notes.components.css:
      .sticky-note-container:
        height: 99vh;
        width: 99.6vw;

    styles.css:


  */

  getPosition(note : any) {
    let x = note.xaxis;
    let y = note.yaxis;
    while(note && !isNaN(note.offsetLeft) && !isNaN(note.offsetTop)) {
      x += note.offsetLeft - note.scrollLeft;
      y += note.offsetTop - note.scrollTop;
      note = note.offsetParent;
    }
    return { x, y };
  }

  dragEnd(event: CdkDragEnd, note: any) {

    console.log(this.getPosition(note));

    console.log(event, note.title);
    const { x : distX, y : distY } = event.distance;
    console.log(note.xaxis + distX, note.yaxis + distY);
    note.xaxis += distX;
    note.yaxis += distY;

   // this.updateStickyNote(note);
  }


}
