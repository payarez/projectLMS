import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { StudentI } from '../models/usersAndEnrollment/student';

@Injectable({
  providedIn: 'root'
})
export class StudentS {
  private studentsService = new BehaviorSubject<StudentI[]>([
    {
      id: 1,
      name: 'Carlos Pérez',
      email: 'carlos@example.com',
      createdAt: new Date(2023, 4, 15),  // 15 de mayo de 2023
      updatedAt: new Date(2023, 4, 15),
      status: 'ACTIVE',
      enrollmentIds: [101, 102]
    },
    {
      id: 2,
      name: 'María Gómez',
      email: 'maria@example.com',
      createdAt: new Date(2022, 9, 7),   // 7 de octubre de 2022
      updatedAt: new Date(2023, 2, 1),
      status: 'INACTIVE',
      enrollmentIds: []
    }
  ]);

  students$ = this.studentsService.asObservable();

  getStudents() {
    return this.studentsService.value;
  }

  addStudent(student: StudentI) {
    const students = this.studentsService.value;
    student.id = students.length ? Math.max(...students.map(s => s.id ?? 0)) + 1 : 1;
    student.createdAt = new Date();
    student.updatedAt = new Date();
    this.studentsService.next([...students, student]);
  }
}
