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
  @Input() content: string = '';
  @Output() positionChange = new EventEmitter<{ x: number, y: number }>();

  constructor(private stickyNoteService: StickyNoteService) { }

  ngOnInit() {
    this.loadStickyNotes();
  }

  loadStickyNotes() {
  alert("loading StickyNotes");
    this.stickyNoteService.getStickyNotes(1, 1).subscribe((notes) => {
      this.stickyNotes = notes.notes;
      console.log(this.stickyNotes);
    });
  }
  //fdasf

  createStickyNote() {
    const newNote = {
      id : this.id,
      title: this.title,
      content: this.content,
      xaxis: 0, // Default x-axis position
      yaxis: 0, // Default y-axis position
    };

    this.stickyNoteService.createStickyNote(newNote, 1).subscribe((createdNote) => {
      this.stickyNotes.push(createdNote);
    });
  }

  updateStickyNotePosition(note: any ) {
    this.stickyNoteService.updateStickyNote(note,1 ,note.id).subscribe(() => {
      // Update successful, do something if needed
    });
  }

  onPositionChange(event: any, note: any) {
    const { x, y } = event.source.getFreeDragPosition(); // Get the new position of the sticky note
    note.xaxis = x;
    note.yaxis = y;
    this.positionChange.emit({ x, y }); // Emit the new position to update the backend
    this.updateStickyNotePosition(note); // Update the sticky note position in the backend
  }
}
