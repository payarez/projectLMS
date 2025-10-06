import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StudentService } from '../../../../services/usersAndEnrrollment/student-service';

@Component({
  selector: 'app-create-students',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './create-students.html',
  styleUrl: './create-students.css'
})
export class CreateStudents {
  form: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['ACTIVE', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.studentService.addStudent({
        name: value.name ?? '',
        email: value.email ?? '',
        status: value.status === 'ACTIVE' || value.status === 'INACTIVE' ? value.status : 'ACTIVE'
      });
      this.router.navigate(['/students']);
    }
  }

  cancelar() {
    this.router.navigate(['/students']);
  }
}
