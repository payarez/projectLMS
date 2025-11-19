import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LessonI } from '../../models/academicManagment/lesson';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private baseUrl = 'http://localhost:4000/api/lessons';
  private lessonsSubject = new BehaviorSubject<LessonI[]>([]);
  public lessons$ = this.lessonsSubject.asObservable();

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

  getAllLessons(): Observable<LessonI[]> {
    return this.http.get<LessonI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getLessonById(id: number): Observable<LessonI> {
    return this.http.get<LessonI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createLesson(lesson: LessonI): Observable<LessonI> {
    return this.http.post<LessonI>(this.baseUrl, lesson, { headers: this.getHeaders() });
  }

  updateLesson(id: number, lesson: LessonI): Observable<LessonI> {
    return this.http.patch<LessonI>(`${this.baseUrl}/${id}`, lesson, { headers: this.getHeaders() });
  }

  deleteLesson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteLessonLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  updateLocalLessons(lessons: LessonI[]): void {
    this.lessonsSubject.next(lessons);
  }

  refreshLessons(): void {
    this.getAllLessons().subscribe(lessons => {
      this.lessonsSubject.next(lessons);
    });
  }
}
