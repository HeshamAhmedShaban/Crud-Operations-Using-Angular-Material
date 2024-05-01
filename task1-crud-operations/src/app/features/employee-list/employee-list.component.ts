import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IEmployee } from '../../core/models/interfaces/iemployee';
import { AddEditEmployeeComponent } from '../../core/static-components/add-edit-employee/add-edit-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { ActionService } from '../../core/services/action.service';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule,MatButtonModule,MatIconModule,CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit  {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dateOfBirth', 'gender', 'education', 'company', 'experience', 'package','actions'];
  dataSource!: MatTableDataSource<IEmployee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
constructor(private _serviceEmployee: EmployeeService,private dialogRef:MatDialog,private actionService:ActionService) {}


  ngOnInit(): void {
    this._serviceEmployee.employees$.subscribe(employees=>{
      this.dataSource = new MatTableDataSource(employees);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    this.getAllEmployees()
  }

  getAllEmployees(){
    this._serviceEmployee.getEmployees().subscribe({
      next: (data: IEmployee | IEmployee[]) => {
        if (Array.isArray(data)) {
          this.dataSource = new MatTableDataSource(data);
        } else {
          this.dataSource = new MatTableDataSource([data]);
        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  

  deleteEmployee(id:string){
    this._serviceEmployee.deleteEmployee(id).subscribe({
      next:(data)=>{
        // alert("Employee deleted successfully")
        this.actionService.openSnackBar("Employee deleted successfully")
        this.getAllEmployees()
      }
    })
  }

  openEditForm(data:IEmployee){
    this.dialogRef.open(AddEditEmployeeComponent,{
      data,
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

