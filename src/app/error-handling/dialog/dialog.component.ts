import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public get title(): string {
    return this.dialogData.title;
  }

  public get message(): string {
    return this.dialogData.message;
  }

  constructor(
      private readonly mdDialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) private readonly dialogData: any
  ) { }

  public close() {
    this.mdDialogRef.close();
  }
}
