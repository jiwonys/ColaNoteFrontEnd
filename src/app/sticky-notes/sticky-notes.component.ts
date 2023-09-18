import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-sticky-notes',
  templateUrl: './sticky-notes.component.html',
  styleUrls: ['./sticky-notes.component.css']
})
export class StickyNotesComponent {
  @Input() note: any; // Change the type to match your note data structure
  @Output() stickyNoteUpdate = new EventEmitter<any>();
  @Output() stickyNoteDelete = new EventEmitter<any>();

// Function to trigger the updateStickyNote function in the parent component
updateStickyNoteInParent(note: any) {
  this.stickyNoteUpdate.emit(note);
}

// Function to trigger the delete function in the parent component
deleteNoteInParent(note: any) {
  this.stickyNoteDelete.emit(note);
}

}
