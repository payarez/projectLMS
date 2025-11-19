import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TagI } from '../../models/forumsAndCommunity/tag';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private baseUrl = 'http://localhost:4000/api/tags';
  private tagsSubject = new BehaviorSubject<TagI[]>([]);
  public tags$ = this.tagsSubject.asObservable();

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

  /** 🔹 Obtener todos los tags */
  getAllTags(): Observable<TagI[]> {
    return this.http.get<TagI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  /** 🔹 Obtener un tag por ID */
  getTagById(id: number): Observable<TagI> {
    return this.http.get<TagI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** 🔹 Crear un nuevo tag */
  createTag(tag: TagI): Observable<TagI> {
    return this.http.post<TagI>(this.baseUrl, tag, { headers: this.getHeaders() });
  }

  /** 🔹 Actualizar un tag existente */
  updateTag(id: number, tag: TagI): Observable<TagI> {
    return this.http.patch<TagI>(`${this.baseUrl}/${id}`, tag, { headers: this.getHeaders() });
  }

  /** 🔹 Eliminar un tag (físico) */
  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** 🔹 Eliminación lógica de un tag */
  deleteTagLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  /** 🔹 Actualizar estado local */
  updateLocalTags(tags: TagI[]): void {
    this.tagsSubject.next(tags);
  }

  /** 🔹 Refrescar lista desde la API */
  refreshTags(): void {
    this.getAllTags().subscribe(tags => {
      this.tagsSubject.next(tags);
    });
  }
}
