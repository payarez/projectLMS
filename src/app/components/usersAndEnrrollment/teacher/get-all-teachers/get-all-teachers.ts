import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TeacherI } from '../../../../models/teacher';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-get-all-teachers',
  imports: [CommonModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './get-all-teachers.html',
  styleUrl: './get-all-teachers.css'
})
export class GetAllTeachers {
  
  teachers: TeacherI[] = [
    {
      id: 1,
      name: 'John Doe',
      subject: 'Mathematics',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      registration_date: new Date('2020-01-01'),
      status: 'ACTIVE'
    },
    {
      id: 2,
      name: 'Jane Smith',
      subject: 'Science',
      email: 'jane.smith@example.com',
      phone: '098-765-4321',
      registration_date: new Date('2020-02-01'),
      status: 'INACTIVE'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      subject: 'History',
      email: 'alice.johnson@example.com',
      phone: '555-123-4567',
      registration_date: new Date('2020-03-01'),
      status: 'ACTIVE'
    }
  ];

  
}
