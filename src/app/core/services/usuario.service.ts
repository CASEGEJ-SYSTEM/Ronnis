import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../models/user.model';
import { Entrenador } from '../models/trainer.model';

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

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuarioByClave(clave_usuario: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${clave_usuario}`);
  }

  registrarUsuario(data: any): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, data);
  }

  actualizarUsuario(clave_usuario: string, data: any): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${clave_usuario}`, data);
  }

  //eliminarUsuario(clave_usuario: string): Observable<any> {
    //return this.http.delete<any>(`${this.apiUrl}/${clave_usuario}`);
  //}

  buscarUsuarios(texto: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/api/usuarios/buscar/general/${texto}`);
  }


  getUsuariosPorSede(sede: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/por-sede`, { params: { sede } });
  }


  buscarUsuariosDeSede(texto: string, sede: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/api/usuarios/buscar/sede`, {
      params: { texto, sede }
    });
  }


  eliminarUsuario(clave_usuario: string) {
    return this.http.put(`${this.apiUrl}/${clave_usuario}/eliminar`, {});
  }


  // =====================================
  //               Pagos
  // =====================================


  registrarPago(data: any): Observable<any> {
    return this.http.post<any>(this.pagosUrl, data);
  }

  actualizarPago(clave: string, data: any) {
    return this.http.put<any>(`${this.pagosUrl}/${clave}`, data);
  }

  getPagos(tipo: string = 'todos', sede: string = '') {
    let params: any = {};
    if (tipo !== 'todos') params.tipo = tipo;
    if (sede) params.sede = sede;
    return this.http.get<any[]>(this.pagosUrl, { params });
  }

  getPagosByClave(clave_usuario: string) {
    return this.http.get(`${this.pagosUrl}/${clave_usuario}`);
  }

  subirFoto(clave: string, formData: FormData) {
    return this.http.post(`${this.apiUrl}/${clave}/subir-foto`, formData);
  }



 
  // =====================================
  //               Asistencias
  // =====================================
 
  registrarAsistencia(data: any): Observable<any> {
    return this.http.post<any>(this.asistenciasUrl, data);
  }

  // =====================================
  //               Personal
  // =====================================
 

  registrarPersonal(data: FormData): Observable<Entrenador> {
    return this.http.post<Entrenador>(`${environment.apiUrl}/api/personal`, data);
  }


  getPersonalByClave(clave: string): Observable<Entrenador> {
    return this.http.get<Entrenador>(`${environment.apiUrl}/api/personal/${clave}`);
  }
  getPersonal(sede: string = ''): Observable<Entrenador[]> {
    let params: any = {};
    if (sede !== '') params.sede = sede;
    return this.http.get<Entrenador[]>(`${environment.apiUrl}/api/personal`, { params });
  }


  eliminarPersonal(clave: string) {
    return this.http.delete(`${environment.apiUrl}/api/personal/${clave}`);
  }

 actualizarPersonal(clave: string, formData: FormData): Observable<Entrenador> {
    return this.http.post<Entrenador>(`${environment.apiUrl}/api/personal/${clave}?_method=PUT`, formData);
  }

  getPersonalPorSede(sede: string): Observable<Entrenador[]> {
    return this.http.get<Entrenador[]>(`${environment.apiUrl}/api/personal`, { params: { sede } });
  }


}
