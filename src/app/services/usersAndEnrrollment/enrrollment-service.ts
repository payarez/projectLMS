import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnrollmentI } from '../../models/usersAndEnrrollment/enrollment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private baseUrl = 'http://localhost:4000/api/enrollments';
  private enrollmentsSubject = new BehaviorSubject<EnrollmentI[]>([]);
  public enrollments$ = this.enrollmentsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /** 🔹 Headers con token de autorización */
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  /** 🔹 Obtener todos los enrollments desde backend */
  getAllEnrollments(): Observable<EnrollmentI[]> {
    return this.http.get<EnrollmentI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  /** 🔹 Obtener enrollment por ID */
  getEnrollmentById(id: number): Observable<EnrollmentI> {
    return this.http.get<EnrollmentI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** 🔹 Crear un nuevo enrollment */
  createEnrollment(enrollment: EnrollmentI): Observable<EnrollmentI> {
    return this.http.post<EnrollmentI>(this.baseUrl, enrollment, { headers: this.getHeaders() });
  }

  /** 🔹 Actualizar un enrollment existente */
  updateEnrollment(id: number, enrollment: EnrollmentI): Observable<EnrollmentI> {
    return this.http.patch<EnrollmentI>(`${this.baseUrl}/${id}`, enrollment, { headers: this.getHeaders() });
  }

  /** 🔹 Eliminar enrollment */
  deleteEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** 🔹 Actualizar lista local de enrollments */
  updateLocalEnrollments(enrollments: EnrollmentI[]): void {
    this.enrollmentsSubject.next(enrollments);
  }

  /** 🔹 Refrescar lista desde el servidor */
  refreshEnrollments(): void {
    this.getAllEnrollments().subscribe(enrollments => {
      this.enrollmentsSubject.next(enrollments);
    });
  }
}
