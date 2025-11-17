import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${environment.apiUrl}/api/usuarios`;
  private pagosUrl = `${environment.apiUrl}/api/pagos`;
  private personalUrl = `${environment.apiUrl}/api/personal`;

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener usuario por clave_usuario
  getUsuarioByClave(clave_usuario: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${clave_usuario}`);
  }

  // Registrar usuario
  registrarUsuario(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // 🔍 Búsqueda avanzada
  buscarUsuarios(texto: string): Observable<any[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<any[]>(`${environment.apiUrl}/api/buscar/usuarios`, { params });
  }

  // Actualizar usuario
  actualizarUsuario(clave_usuario: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${clave_usuario}`, data);
  }

  // Eliminar usuario
  eliminarUsuario(clave_usuario: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${clave_usuario}`);
  }

  // Registrar pago
  registrarPago(data: any): Observable<any> {
    return this.http.post<any>(this.pagosUrl, data);
  }

  // Registrar personal
  registrarPersonal(data: any): Observable<any> {
    return this.http.post<any>(this.personalUrl, data);
  }
}
