import { Injectable } from '@angular/core';
import { AttemptI } from '../../models/academicActivities/attempt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AttemptService {
  private baseUrl = 'http://localhost:4000/api/attempts';

  private attemptsSubject = new BehaviorSubject<AttemptI[]>([]);
  public attempts$ = this.attemptsSubject.asObservable();

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

  /* ===============================
         CRUD PRINCIPALES
     =============================== */

  getAllAttempts(): Observable<AttemptI[]> {
    return this.http.get<AttemptI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getAttemptById(id: number): Observable<AttemptI> {
    return this.http.get<AttemptI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createAttempt(attempt: AttemptI): Observable<AttemptI> {
    return this.http.post<AttemptI>(this.baseUrl, attempt, { headers: this.getHeaders() });
  }

  updateAttempt(id: number, attempt: AttemptI): Observable<AttemptI> {
    return this.http.patch<AttemptI>(`${this.baseUrl}/${id}`, attempt, { headers: this.getHeaders() });
  }

  deleteAttempt(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteAttemptLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  /* ===============================
         STATE MANAGEMENT
     =============================== */

  updateLocalAttempts(attempts: AttemptI[]): void {
    this.attemptsSubject.next(attempts);
  }

  refreshAttempts(): void {
    this.getAllAttempts().subscribe(attempts => {
      this.attemptsSubject.next(attempts);
    });
  }
}
