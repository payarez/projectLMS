import { Injectable } from '@angular/core';
import { SubmissionI } from '../../models/academicActivities/submission';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class SubmissionService {
  private baseUrl = 'http://localhost:4000/api/submissions';

  private submissionsSubject = new BehaviorSubject<SubmissionI[]>([]);
  public submissions$ = this.submissionsSubject.asObservable();

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

  getAllSubmissions(): Observable<SubmissionI[]> {
    return this.http.get<SubmissionI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getSubmissionById(id: number): Observable<SubmissionI> {
    return this.http.get<SubmissionI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createSubmission(submission: SubmissionI): Observable<SubmissionI> {
    return this.http.post<SubmissionI>(this.baseUrl, submission, { headers: this.getHeaders() });
  }

  updateSubmission(id: number, submission: SubmissionI): Observable<SubmissionI> {
    return this.http.patch<SubmissionI>(`${this.baseUrl}/${id}`, submission, { headers: this.getHeaders() });
  }

  deleteSubmission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteSubmissionLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  /* ===============================
          STATE MANAGEMENT
     =============================== */

  updateLocalSubmissions(submissions: SubmissionI[]): void {
    this.submissionsSubject.next(submissions);
  }

  refreshSubmissions(): void {
    this.getAllSubmissions().subscribe(submissions => {
      this.submissionsSubject.next(submissions);
    });
  }
}
