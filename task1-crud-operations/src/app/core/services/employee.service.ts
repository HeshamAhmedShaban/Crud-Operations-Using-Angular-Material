import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IEmployee } from '../models/interfaces/iemployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesSubject: BehaviorSubject<IEmployee[]> = new BehaviorSubject<IEmployee[]>([]);
  public employees$: Observable<IEmployee[]> = this.employeesSubject.asObservable();

  // private numberOfEmployeesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // public numberOfEmployees$: Observable<number> = this.numberOfEmployeesSubject.asObservable();

  constructor(private _http: HttpClient) {
    this.getEmployees().subscribe(employees => {
      this.employeesSubject.next(employees);
      // this.numberOfEmployeesSubject.next(employees.length);
    });
  }
//Get All Employees
  public getEmployees():Observable<IEmployee[]>{
    return this._http.get<IEmployee[]>("http://localhost:3000/Employees")
  }

  public getEmployeeCount():Observable<number>{
    return this.employees$.pipe(map(employees => employees.length))
  }
//Add Employee
  public addEmpolyee(data:IEmployee):Observable<IEmployee>{
    return this._http.post<IEmployee>("http://localhost:3000/Employees",data)
  }

  //Update Employee
  public updateEmployee(id:string,data:any):Observable<IEmployee>{
    return this._http.put<IEmployee>(`http://localhost:3000/Employees/${id}`,data)
  }

  //Delete Employee
  public deleteEmployee(id:string):Observable<IEmployee>{
    return this._http.delete<IEmployee>(`http://localhost:3000/Employees/${id}`).pipe(
      tap(()=>{
        this.notifyEmployeeDeleted(id);
      })
    )
  }

  public updateEmployees(): void {
    this.getEmployees().subscribe(employees => {
      this.employeesSubject.next(employees);
    });
  }

  // notifyEmployeeDeleted() {
  //   this.numberOfEmployeesSubject.next(this.numberOfEmployeesSubject.value - 1);
  // }


  public notifyEmployeeDeleted(id:string) {
    const currentEmployees = this.employeesSubject.getValue();
    this.employeesSubject.next(currentEmployees.filter(emp => emp.id !== id));
  }
}
