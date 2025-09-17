// create-students.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { StudentS } from '../../../../services/student-s';

@Component({
  selector: 'app-create-students',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-students.html',
  styleUrl: './create-students.css',
})
export class CreateStudents {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private studentService: StudentS) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['ACTIVE', Validators.required],
      createdAt: ['', Validators.required],
      updatedAt: ['', Validators.required],
      enrollmentIds: [''],
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.studentService.addStudent({
        name: value.name ?? '',
        email: value.email ?? '',
        status: value.status,
        createdAt: new Date(value.createdAt),
        updatedAt: new Date(value.updatedAt),
        enrollmentIds: value.enrollmentIds
          ? value.enrollmentIds.split(',').map((id: string) => Number(id.trim()))
          : [],
      });

      this.router.navigate(['/students']);
    }
  }

  cancelar() {
    this.router.navigate(['/students']);
  }
}
