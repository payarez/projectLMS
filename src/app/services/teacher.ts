import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TeacherI } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class Teacher {
  private teachersService = new BehaviorSubject<TeacherI[]>([
    {
      id: 1,
      name: 'John Doe',
      subject: '123 Main St',
      email: 'password',
      phone: '555-1234',
      registration_date: new Date(2023, 4, 15), // 15 de mayo de 2023
      status: 'ACTIVE'
    },
    {
      id: 2,
      name: 'Jane Smith',
      subject: '456 Elm St',
      email: 'jane@example.com',
      phone: '555-5678',
      registration_date: new Date(2022, 9, 7), // 7 de octubre de 2022
      status: 'INACTIVE'
    }
  ]);
  teachers$ = this.teachersService.asObservable();

  getTeachers() {
    return this.teachersService.value;
  }

  addTeachers(teacher: TeacherI) {
    const teachers = this.teachersService.value;
    teacher.id = teachers.length ? Math.max(...teachers.map(c => c.id ?? 0)) + 1 : 1;
    this.teachersService.next([...teachers, teacher]);
  }
}
