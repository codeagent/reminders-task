import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-prompt-dialog',
  templateUrl: './delete-prompt-dialog.component.html',
  styleUrls: ['./delete-prompt-dialog.component.css']
})
export class DeletePromptDialogComponent  {

  constructor(
    // public dialogRef: MatDialogRef<DeletePromptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    // onNoClick(): void {
    //   this.dialogRef.close();
    // }
}
