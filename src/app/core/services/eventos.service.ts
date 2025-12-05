import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private eventosUrl = `${environment.apiUrl}/api/eventos`;

  constructor(private http: HttpClient) {}


// =====================================
//               Eventos
// =====================================

getEventos(sede: string = ''): Observable<Evento[]> {
  let params: any = {};
  if (sede !== '') params.sede = sede;
  return this.http.get<Evento[]>(`${environment.apiUrl}/api/eventos`, { params });
}

getEventosByClave(clave: string): Observable<Evento> {
  return this.http.get<Evento>(`${environment.apiUrl}/api/eventos/${clave}`);
}

registrarEventos(formData: FormData): Observable<Evento> {
  return this.http.post<Evento>(`${environment.apiUrl}/api/eventos`, formData);
}

actualizarEventos(clave: string, formData: FormData): Observable<Evento> {
  return this.http.post<Evento>(`${environment.apiUrl}/api/eventos/${clave}?_method=PUT`, formData);
}

eliminarEventos(clave: string): Observable<any> {
  return this.http.delete<any>(`${environment.apiUrl}/api/eventos/${clave}`);
}
}
