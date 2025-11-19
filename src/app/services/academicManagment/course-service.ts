import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CourseI } from '../../models/academicManagment/course';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:4000/api/courses';
  private coursesSubject = new BehaviorSubject<CourseI[]>([]);
  public courses$ = this.coursesSubject.asObservable();

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

  getAllCourses(): Observable<CourseI[]> {
    return this.http.get<CourseI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getCourseById(id: number): Observable<CourseI> {
    return this.http.get<CourseI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createCourse(course: CourseI): Observable<CourseI> {
    return this.http.post<CourseI>(this.baseUrl, course, { headers: this.getHeaders() });
  }

  updateCourse(id: number, course: CourseI): Observable<CourseI> {
    return this.http.patch<CourseI>(`${this.baseUrl}/${id}`, course, { headers: this.getHeaders() });
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteCourseLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  updateLocalCourses(courses: CourseI[]): void {
    this.coursesSubject.next(courses);
  }

  refreshCourses(): void {
    this.getAllCourses().subscribe(courses => {
      this.coursesSubject.next(courses);
    });
  }
}
