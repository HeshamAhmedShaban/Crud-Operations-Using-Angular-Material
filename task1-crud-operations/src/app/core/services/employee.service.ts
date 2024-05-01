import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEmployee } from '../models/interfaces/iemployee';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesSubject: BehaviorSubject<IEmployee[]> = new BehaviorSubject<IEmployee[]>([]);
  public employees$: Observable<IEmployee[]> = this.employeesSubject.asObservable();


  constructor(private _http: HttpClient) {
    this.getEmployees().subscribe(employees => {
      this.employeesSubject.next(employees);
    });
  }
//Get All Employees
  getEmployees():Observable<IEmployee[]>{
    return this._http.get<IEmployee[]>("http://localhost:3000/Employees")
  }
//Add Employee
  addEmpolyee(data:IEmployee):Observable<IEmployee>{
    return this._http.post<IEmployee>("http://localhost:3000/Employees",data)
  }

  //Update Employee
  updateEmployee(id:string,data:any):Observable<IEmployee>{
    return this._http.put<IEmployee>(`http://localhost:3000/Employees/${id}`,data)
  }

  //Delete Employee
  deleteEmployee(id:string):Observable<IEmployee>{
    return this._http.delete<IEmployee>(`http://localhost:3000/Employees/${id}`)
  }
}
