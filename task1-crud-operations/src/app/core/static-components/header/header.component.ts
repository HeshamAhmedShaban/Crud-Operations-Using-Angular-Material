import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';

import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,MatDividerModule,MatButtonModule,MatToolbarModule,AddEditEmployeeComponent,MatBadgeModule,FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  numberOfEmployees:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // public numberOfEmployees:number=0;
  constructor(private _dialog: MatDialog,private employeeService:EmployeeService) {}


  ngOnInit(): void {
    this.employeeService.employees$.subscribe(employees => {
      this.numberOfEmployees.next(employees.length);
    });
  }


  public openAddEdditEmployeeForm() {
    this._dialog.open(AddEditEmployeeComponent)
  }
}
