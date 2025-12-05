import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Instalacion } from '../models/facility.model';

@Injectable({
  providedIn: 'root'
})
export class InstalacionesService {

  private instalacionesUrl = `${environment.apiUrl}/api/instalaciones`;

  constructor(private http: HttpClient) {}


// =====================================
//               instalaciones
// =====================================

getInstalaciones(sede: string = ''): Observable<Instalacion[]> {
  let params: any = {};
  if (sede !== '') params.sede = sede;
  return this.http.get<Instalacion[]>(`${environment.apiUrl}/api/instalaciones`, { params });
}

getInstalacionesByClave(clave: string): Observable<Instalacion> {
  return this.http.get<Instalacion>(`${environment.apiUrl}/api/instalaciones/${clave}`);
}

registrarInstalaciones(formData: FormData): Observable<Instalacion> {
  return this.http.post<Instalacion>(`${environment.apiUrl}/api/instalaciones`, formData);
}

actualizarInstalaciones(clave: string, formData: FormData): Observable<Instalacion> {
  return this.http.post<Instalacion>(`${environment.apiUrl}/api/instalaciones/${clave}?_method=PUT`, formData);
}

eliminarInstalaciones(clave: string): Observable<any> {
  return this.http.delete<any>(`${environment.apiUrl}/api/instalaciones/${clave}`);
}
}
