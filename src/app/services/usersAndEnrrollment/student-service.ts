import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { StudentI } from '../../models/usersAndEnrrollment/student';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class Student {
  private baseUrl = 'http://localhost:4000/api/students';
  private studentsSubject = new BehaviorSubject<StudentI[]>([]);
  public students$ = this.studentsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Obtener todos los estudiantes
  getAllStudents(): Observable<StudentI[]> {
    return this.http.get<StudentI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  // Obtener estudiante por ID
  getStudentById(id: number): Observable<StudentI> {
    return this.http.get<StudentI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Crear estudiante
  createStudent(student: StudentI): Observable<StudentI> {
    return this.http.post<StudentI>(this.baseUrl, student, { headers: this.getHeaders() });
  }

  // Actualizar estudiante
  updateStudent(id: number, student: StudentI): Observable<StudentI> {
    return this.http.patch<StudentI>(`${this.baseUrl}/${id}`, student, { headers: this.getHeaders() });
  }

  // Eliminar estudiante (físico)
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Eliminación lógica (si tu backend la soporta)
  deleteStudentLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Actualizar el estado local de estudiantes
  updateLocalStudents(students: StudentI[]): void {
    this.studentsSubject.next(students);
  }

  // Refrescar la lista desde el servidor
  refreshStudents(): void {
    this.getAllStudents().subscribe(students => {
      this.studentsSubject.next(students);
    });
  }
}
