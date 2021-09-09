import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";

@Injectable()
export class DialogService {
    constructor(private readonly dialog: MatDialog) { }
    
    public showHttpErrorDialog(statusCode: number, message: string) {
        this.dialogRef = this.dialog.open(DialogComponent, {    
            data: {
                title: 'Request failed !',
                message: `${message}, Status Code - ${statusCode}`
            }
        });  
    }

  private dialogRef?: MatDialogRef<DialogComponent>;
}