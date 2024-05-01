import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { EmployeeService } from '../../services/employee-service';
import { DialogRef } from '@angular/cdk/dialog';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [CommonModule,FormsModule,MatDialogModule,MatRadioModule,MatDatepickerModule,MatNativeDateModule,MatButtonModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.css'
})
export class AddEditEmployeeComponent {

education:string[]=["Matric","Diploma","Intermediate","Graduation","Post Graduation"];

employeeForm:FormGroup;

constructor(private formBulder:FormBuilder,private serviceEmployee:EmployeeService,private dialogRef:DialogRef){
this.employeeForm=this.formBulder.group({
  firstName:['',Validators.required],
  lastName:['',Validators.required],
  email:['',Validators.required],
  dateOfBirth:['',Validators.required],
  gender:['',Validators.required],
  education:['',Validators.required],
  company:['',Validators.required],
  experience:['',Validators.required],
  package:['',Validators.required],
})
}

  FormSubmit(){
  if(this.employeeForm.valid){
    this.serviceEmployee.addEmpolyee(this.employeeForm.value).subscribe({
      next:(res)=>{
        alert("Employee added successfully")
        this.dialogRef.close();
        // this.employeeForm.reset();
      },
      error:(err)=>{
        alert("Error while adding the employee"+" "+err)
      }
    });
  }
  }
}

