import { Component } from '@angular/core';

@Component({
  selector: 'app-post-it-note',
  templateUrl: './post-it-note.component.html',
  styleUrls: ['./post-it-note.component.css']
})
export class PostItNoteComponent implements onInit {
  notes: Note[] = [];

   constructor(private noteService: NoteService) {}

   ngOnInit() {
     this.getNotes();
   }

   getNotes() {
     this.noteService.getNotes().subscribe(
       (notes: Note[]) => {
         this.notes = notes;
       },
       (error) => {
         console.error('Error retrieving notes:', error);
       }
     );
   }
}
