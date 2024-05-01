import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,MatDividerModule,MatButtonModule,MatToolbarModule,AddEditEmployeeComponent,FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private _dialog: MatDialog) {}

  openAddEdditEmployeeForm() {
    this._dialog.open(AddEditEmployeeComponent)
  }
}
