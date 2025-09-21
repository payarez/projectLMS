import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudentI } from '../../models/usersAndEnrrollment/student';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly _state = new BehaviorSubject<StudentI[]>([
    // example data
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'ACTIVE' },
    { id: 2, name: 'Bob Smith Junior', email: 'bob@example.com', status: 'INACTIVE' }
  ]);

  readonly students$ = this._state.asObservable();
  private get value(): StudentI[] { return this._state.value; }

  // GET all students
  getStudents(): StudentI[] {
    return this.value;
  }

  // ADD a new student
  addStudent(student: Omit<StudentI, 'id'>): StudentI {
    const nextId = this.value.length ? Math.max(...this.value.map(s => s.id ?? 0)) + 1 : 1;
    const newStudent: StudentI = { id: nextId, ...student };
    this._state.next([...this.value, newStudent]);
    return newStudent;
  }
}
