// get-all-students.ts
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { StudentI } from '../../../../models/usersAndEnrollment/student';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { StudentS } from '../../../../services/student-s';

@Component({
  selector: 'app-get-all-students',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-students.html',
  styleUrl: './get-all-students.css'
})
export class GetAllStudents {
  students: StudentI[] = [];

  constructor(private studentService: StudentS) {
    this.studentService.students$.subscribe(students => {
      this.students = students;
    });
  }
}
