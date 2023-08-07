import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { StickyNoteService } from './sticky-note.service';

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
//   alert("Making changes" + note.title + note.info);
    this.stickyNoteService.updateStickyNote(note,1 ,note.id).subscribe(() => {
//       alert("a request has been sent with the information of note title:"  + note.title + "and note info" + note.info)
    });
  }

  onPositionChange(event: any, note: any) {
    const { x, y } = event.source.getFreeDragPosition(); // Get the new position of the sticky note
    note.xaxis = x;
    note.yaxis = y;
    this.updateStickyNote(note); // Update the sticky note position in the backend
  }
}