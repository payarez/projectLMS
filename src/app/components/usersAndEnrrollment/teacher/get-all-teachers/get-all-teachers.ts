import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TeacherI } from '../../../../models/usersAndEnrrollment/teacher';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { Teacher } from '../../../../services/usersAndEnrrollment/teacher';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-get-all-teachers',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule, TagModule],
  templateUrl: './get-all-teachers.html',
  styleUrl: './get-all-teachers.css'
})
export class GetAllTeachers {
  teachers: TeacherI[] = [];

  constructor(private teacherService: Teacher) {
    this.teacherService.teachers$.subscribe(teachers => {
      this.teachers = teachers;
    });
  }

  
}
