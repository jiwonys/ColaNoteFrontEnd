import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteListComponent } from './components/note-list.component';
import { NoteCreateComponent } from './components/note-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: NoteListComponent },
  { path: 'notes/create', component: NoteCreateComponent },
  // Add more routes for editing, deleting, or any additional functionality
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
