import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }
//Get All Employees
  getEmployees():Observable<any>{
    return this._http.get("http://localhost:3000/Employees")
  }
//Add Employee
  addEmpolyee(data:any):Observable<any>{
    return this._http.post("http://localhost:3000/Employees",data)
  }
}
