import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../core/services/employee-service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule,CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit  {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dateOfBirth', 'gender', 'education', 'company', 'experience', 'package'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
constructor(private _serviceEmployee: EmployeeService) {}


  ngOnInit(): void {

    this.getAllEmployees()
  }

  getAllEmployees(){
    this._serviceEmployee.getEmployees().subscribe({
    next:(data)=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator; 
    }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


