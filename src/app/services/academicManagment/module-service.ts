import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ModuleI } from '../../models/academicManagment/module';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private baseUrl = 'http://localhost:4000/api/modules'; // ajusta tu endpoint
  private modulesSubject = new BehaviorSubject<ModuleI[]>([]);
  public modules$ = this.modulesSubject.asObservable();

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

  /** 🔹 Obtener todos los módulos */
  getAllModules(): Observable<ModuleI[]> {
    return this.http.get<ModuleI[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  /** 🔹 Obtener un módulo por ID */
  getModuleById(id: number): Observable<ModuleI> {
    return this.http.get<ModuleI>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** 🔹 Crear un nuevo módulo */
  createModule(module: ModuleI): Observable<ModuleI> {
    return this.http.post<ModuleI>(this.baseUrl, module, { headers: this.getHeaders() });
  }

  /** 🔹 Actualizar un módulo existente */
  updateModule(id: number, module: ModuleI): Observable<ModuleI> {
    return this.http.patch<ModuleI>(`${this.baseUrl}/${id}`, module, { headers: this.getHeaders() });
  }

  /** 🔹 Eliminar un módulo (físico) */
  deleteModule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** 🔹 Eliminación lógica de un módulo */
  deleteModuleLogic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/logic`, { headers: this.getHeaders() });
  }

  /** 🔹 Actualizar estado local */
  updateLocalModules(modules: ModuleI[]): void {
    this.modulesSubject.next(modules);
  }

  /** 🔹 Refrescar lista desde la API */
  refreshModules(): void {
    this.getAllModules().subscribe(modules => {
      this.modulesSubject.next(modules);
    });
  }
}
