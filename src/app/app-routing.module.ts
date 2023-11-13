import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { BoardComponent } from './board/board.component';
import {StickyNotesComponent} from './sticky-notes/sticky-notes.component';
import {AboutmeComponent} from './aboutme/aboutme.component'
const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'authenticate', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'board', component: BoardComponent},
  { path: 'aboutme', component: AboutmeComponent},
  { path: 'board/:id', component: BoardComponent },

  // Add more routes for editing, deleting, or any additional functionality
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
