import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostItNoteComponent } from './post-it-note/post-it-note.component';
const routes: Routes = [
{path: 'notes', component: PostItNoteComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
