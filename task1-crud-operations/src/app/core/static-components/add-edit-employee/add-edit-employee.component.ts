import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { EmployeeService } from '../../services/employee.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { IEmployee } from '../../models/interfaces/iemployee';
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  providers:[provideNativeDateAdapter()],
  imports: [CommonModule,FormsModule,MatDialogModule,MatRadioModule,MatDatepickerModule,MatNativeDateModule,MatButtonModule,MatFormFieldModule,MatSelectModule,MatSnackBarModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.css'
})
export class AddEditEmployeeComponent implements OnInit {

education:string[]=["Matric","Diploma","Intermediate","Graduation","Post Graduation"];

employeeForm:FormGroup;

constructor(private formBulder:FormBuilder,private serviceEmployee:EmployeeService,private dialogRef:MatDialogRef<AddEditEmployeeComponent>,
  @Inject(MAT_DIALOG_DATA) public editData: IEmployee,private actionService:ActionService){
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

  ngOnInit(): void {
    this.employeeForm.patchValue(this.editData);
  }

//   FormSubmit(){
//   if(this.employeeForm.valid){
//     if(this.editData){
//       this.serviceEmployee.updateEmployee(this.editData.id,this.employeeForm.value).subscribe({
//         next:(res)=>{
          // alert("Employee updated successfully")
//           this.actionService.openSnackBar("Employee updated successfully")
//           this.dialogRef.close(true);
//         },
//         error:(err)=>{
//           alert("Error while adding the employee"+" "+err)
//         }
//       });
//     }else{
//       this.serviceEmployee.addEmpolyee(this.employeeForm.value).subscribe({
//         next:(res)=>{
          // alert("Employee added successfully")
//           this.actionService.openSnackBar("Employee added successfully")
//           this.dialogRef.close(true);
//         },
//         error:(err)=>{
//           alert("Error while adding the employee"+" "+err)
//         }
//       });
//     }
    
//   }
//   }
// }

FormSubmit(): void {
  if (this.employeeForm.valid) {
    if (this.editData) {
      this.serviceEmployee.updateEmployee(this.editData.id, this.employeeForm.value).subscribe({
        next: (res) => {
          this.actionService.openSnackBar("Employee updated successfully"); 
          this.dialogRef.close(true);
          this.serviceEmployee.updateEmployees(); // Emit new value for employees$
        },
        error: (err) => {
          alert("Error while updating the employee" + " " + err);
        }
      });
    } else {
      this.serviceEmployee.addEmpolyee(this.employeeForm.value).subscribe({
        next: (res) => {
          this.actionService.openSnackBar("Employee added successfully");
          this.dialogRef.close(true);
          this.serviceEmployee.updateEmployees(); // Emit new value for employees$
        },
        error: (err) => {
          alert("Error while adding the employee" + " " + err);
        }
      });
    }
  }
}
}