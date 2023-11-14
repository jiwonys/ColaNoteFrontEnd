import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-my-board-dialog',
  templateUrl: './my-board-dialog.component.html',
  styleUrls: ['./my-board-dialog.component.css']
})
export class MyBoardDialogComponent {

  constructor(public dialogRef: MatDialogRef<MyBoardDialogComponent>, @Inject(MAT_DIALOG_DATA) public boards: any[]) {}

  selectBoard(boardId: number): void {
      this.dialogRef.close(boardId);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
