import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-board-dialog',
  templateUrl: './new-board-dialog.component.html',
  styleUrls: ['./new-board-dialog.component.css']
})
export class NewBoardDialogComponent {
  newBoardName: string = '';

  constructor(public dialogRef: MatDialogRef<NewBoardDialogComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
