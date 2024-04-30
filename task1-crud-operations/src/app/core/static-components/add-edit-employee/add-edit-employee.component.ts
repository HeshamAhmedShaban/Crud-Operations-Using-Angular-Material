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

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [CommonModule,FormsModule,MatDialogModule,MatRadioModule,MatDatepickerModule,MatNativeDateModule,MatButtonModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.css'
})
export class AddEditEmployeeComponent {

education:string[]=["Matric","Diploma","Intermediate","Graduation","Post Graduation"];

employeeForm:FormGroup;

constructor(private formBulder:FormBuilder) {
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

  onSubmit(){
  if(this.employeeForm.valid){
    console.log(this.employeeForm.value);
  }
  }
}
