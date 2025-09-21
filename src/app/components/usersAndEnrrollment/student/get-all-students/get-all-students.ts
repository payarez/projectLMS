import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { StudentI } from '../../../../models/usersAndEnrrollment/student';
import { StudentService } from '../../../../services/usersAndEnrrollment/student-service';

@Component({
  selector: 'app-get-all-students',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-students.html',
  styleUrl: './get-all-students.css',
  encapsulation: ViewEncapsulation.None
})
export class GetAllStudents {
  students: StudentI[] = [];

  constructor(private studentService: StudentService) {
    // Cargar students
    this.studentService.students$.subscribe(list => this.students = list);
  }
}
