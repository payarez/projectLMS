import { Injectable } from '@angular/core';
import { AssessmentI } from '../../models/academicActivities/assessment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AssessmentService {

  private baseUrl = 'http://localhost:4000/api/assessments';

  private assessmentsSubject = new BehaviorSubject<AssessmentI[]>([]);
  public assessments$ = this.assessmentsSubject.asObservable();

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

  getAllAssessments(): Observable<AssessmentI[]> {
    return this.http.get<AssessmentI[]>(this.baseUrl, {
      headers: this.getHeaders()
    });
  }

  getAssessmentById(id: number): Observable<AssessmentI> {
    return this.http.get<AssessmentI>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  createAssessment(assessment: AssessmentI): Observable<AssessmentI> {
    return this.http.post<AssessmentI>(this.baseUrl, assessment, {
      headers: this.getHeaders()
    });
  }

  updateAssessment(id: number, assessment: AssessmentI): Observable<AssessmentI> {
    return this.http.patch<AssessmentI>(`${this.baseUrl}/${id}`, assessment, {
      headers: this.getHeaders()
    });
  }

  deleteAssessment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  deleteAssessmentLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, {
      headers: this.getHeaders()
    });
  }

  /* ===============================
         STATE MANAGEMENT
     =============================== */

  updateLocalAssessments(assessments: AssessmentI[]): void {
    this.assessmentsSubject.next(assessments);
  }

  refreshAssessments(): void {
    this.getAllAssessments().subscribe(assessments => {
      this.assessmentsSubject.next(assessments);
    });
  }
}
