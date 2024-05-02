import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private _snackBar: MatSnackBar) { }


  public openSnackBar(message: string, action: string = 'OK') {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
