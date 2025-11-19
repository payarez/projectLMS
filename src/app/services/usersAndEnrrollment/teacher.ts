import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { TeacherI } from '../../models/usersAndEnrrollment/teacher';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class Teacher {
  private baseUrl = 'http://localhost:4000/api/teachers';
  private teachersSubject = new BehaviorSubject<TeacherI[]>([]);
  public teachers$ = this.teachersSubject.asObservable();
  
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

  getAllTeachers(): Observable<TeacherI[]> {
    return this.http.get<TeacherI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getTeacherById(id: number): Observable<TeacherI> {
    return this.http.get<TeacherI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createTeacher(teacher: TeacherI): Observable<TeacherI> {
    return this.http.post<TeacherI>(this.baseUrl, teacher, { headers: this.getHeaders() });
  }

  updateTeacher(id: number, teacher: TeacherI): Observable<TeacherI> {
    return this.http.patch<TeacherI>(`${this.baseUrl}/${id}`, teacher, { headers: this.getHeaders() });
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteTeacherLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  // Método para actualizar el estado local de teachers
  updateLocalTeachers(teachers: TeacherI[]): void {
    this.teachersSubject.next(teachers);
  }

  refreshTeachers(): void {
    this.getAllTeachers().subscribe(teachers => {
      this.teachersSubject.next(teachers);
    });
  }
}
