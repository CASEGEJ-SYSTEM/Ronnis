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
  private asistenciasUrl = `${environment.apiUrl}/api/asistencias`;

  constructor(private http: HttpClient) {}

  // =====================================
  //               USUARIOS
  // =====================================

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsuarioByClave(clave_usuario: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${clave_usuario}`);
  }

  registrarUsuario(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  actualizarUsuario(clave_usuario: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${clave_usuario}`, data);
  }

  //eliminarUsuario(clave_usuario: string): Observable<any> {
    //return this.http.delete<any>(`${this.apiUrl}/${clave_usuario}`);
  //}

  buscarUsuarios(texto: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/buscar/usuarios/${texto}`);
  }


  getUsuariosPorSede(sede: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/por-sede`, { params: { sede } });
  }


  buscarUsuariosDeSede(texto: string, sede: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/usuarios/buscar/sede`, {
      params: { texto, sede }
    });
  }


  eliminarUsuario(clave_usuario: string) {
    return this.http.put(`${this.apiUrl}/${clave_usuario}/eliminar`, {});
  }

  getPersonalPorSede(sede: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/personal`, { params: { sede } });
  }


  getPagos(tipo: string = 'todos', sede: string = '') {
    let params: any = {};
    if (tipo !== 'todos') params.tipo = tipo;
    if (sede) params.sede = sede;
    return this.http.get<any[]>(this.pagosUrl, { params });
  }





  

  // =====================================
  //                PAGOS
  // =====================================

  registrarPago(data: any): Observable<any> {
    return this.http.post<any>(this.pagosUrl, data);
  }

  // =====================================
  //             ASISTENCIAS
  // =====================================

  registrarAsistencia(data: any): Observable<any> {
    return this.http.post<any>(this.asistenciasUrl, data);
  }

  // =====================================
  //               PERSONAL
  // =====================================

  registrarPersonal(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/personal`, data);
  }

  getPagosByClave(clave_usuario: string) {
    return this.http.get(`${this.pagosUrl}/${clave_usuario}`);
  }




}
