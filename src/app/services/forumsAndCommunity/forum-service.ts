import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ForumI } from '../../models/forumsAndCommunity/forum';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private baseUrl = 'http://localhost:4000/api/forums';
  private forumsSubject = new BehaviorSubject<ForumI[]>([]);
  public forums$ = this.forumsSubject.asObservable();

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

  /** 🔹 Obtener todos los foros desde backend */
  getAllForums(): Observable<ForumI[]> {
    return this.http.get<ForumI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  /** 🔹 Obtener foro por ID */
  getForumById(id: number): Observable<ForumI> {
    return this.http.get<ForumI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** 🔹 Crear un nuevo foro */
  createForum(forum: Omit<ForumI, 'id'>): Observable<ForumI> {
    return this.http.post<ForumI>(this.baseUrl, forum, { headers: this.getHeaders() });
  }

  /** 🔹 Actualizar un foro existente */
  updateForum(id: number, forum: Partial<ForumI>): Observable<ForumI> {
    return this.http.patch<ForumI>(`${this.baseUrl}/${id}`, forum, { headers: this.getHeaders() });
  }

  /** 🔹 Eliminar foro */
  deleteForum(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** 🔹 Actualizar lista local de foros */
  updateLocalForums(forums: ForumI[]): void {
    this.forumsSubject.next(forums);
  }

  /** 🔹 Refrescar lista desde el servidor */
  refreshForums(): void {
    this.getAllForums().subscribe(forums => this.forumsSubject.next(forums));
  }
}
