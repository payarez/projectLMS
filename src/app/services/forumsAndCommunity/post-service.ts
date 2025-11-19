import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostI } from '../../models/forumsAndCommunity/post';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:4000/api/posts';
  private postsSubject = new BehaviorSubject<PostI[]>([]);
  public posts$ = this.postsSubject.asObservable();

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

  /** 🔹 Obtener todos los posts desde backend */
  getAllPosts(): Observable<PostI[]> {
    return this.http.get<PostI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  /** 🔹 Obtener post por ID */
  getPostById(id: number): Observable<PostI> {
    return this.http.get<PostI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** 🔹 Crear un nuevo post */
  createPost(post: Omit<PostI, 'id'>): Observable<PostI> {
    return this.http.post<PostI>(this.baseUrl, post, { headers: this.getHeaders() });
  }

  /** 🔹 Actualizar un post existente */
  updatePost(id: number, post: Partial<PostI>): Observable<PostI> {
    return this.http.patch<PostI>(`${this.baseUrl}/${id}`, post, { headers: this.getHeaders() });
  }

  /** 🔹 Eliminar post */
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** 🔹 Actualizar lista local de posts */
  updateLocalPosts(posts: PostI[]): void {
    this.postsSubject.next(posts);
  }

  /** 🔹 Refrescar lista desde el servidor */
  refreshPosts(): void {
    this.getAllPosts().subscribe(posts => this.postsSubject.next(posts));
  }
}
