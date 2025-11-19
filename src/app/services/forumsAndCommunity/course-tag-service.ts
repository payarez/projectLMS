import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CourseTagI } from '../../models/forumsAndCommunity/courseTag';
import { AuthService } from '../auth.service';


@Injectable({ providedIn: 'root' })
export class CourseTagService {
  private baseUrl = 'http://localhost:4000/api/course-tags';
  private courseTagsSubject = new BehaviorSubject<CourseTagI[]>([]);
  public courseTags$ = this.courseTagsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /** 🧩 Añade el token a las cabeceras */
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  /** 🔹 Obtener todos los course-tags */
  getAllCourseTags(): Observable<CourseTagI[]> {
    return this.http.get<CourseTagI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  /** 🔹 Obtener un course-tag por ID */
  getCourseTagById(id: number): Observable<CourseTagI> {
    return this.http.get<CourseTagI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** 🔹 Crear un nuevo course-tag */
  createCourseTag(courseTag: CourseTagI): Observable<CourseTagI> {
    return this.http.post<CourseTagI>(this.baseUrl, courseTag, { headers: this.getHeaders() });
  }

  /** 🔹 Actualizar un course-tag existente */
  updateCourseTag(id: number, courseTag: CourseTagI): Observable<CourseTagI> {
    return this.http.patch<CourseTagI>(`${this.baseUrl}/${id}`, courseTag, { headers: this.getHeaders() });
  }

  /** 🔹 Eliminar un course-tag (físico) */
  deleteCourseTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** 🔹 Eliminación lógica de un course-tag */
  deleteCourseTagLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  /** 🔹 Actualizar lista local */
  updateLocalCourseTags(courseTags: CourseTagI[]): void {
    this.courseTagsSubject.next(courseTags);
  }

  /** 🔹 Refrescar course-tags desde la API */
  refreshCourseTags(): void {
    this.getAllCourseTags().subscribe(courseTags => {
      this.courseTagsSubject.next(courseTags);
    });
  }
}