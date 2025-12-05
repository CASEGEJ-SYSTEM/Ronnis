import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Entrenamiento } from '../models/training.model';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientosService {

  private entrenamientosUrl = `${environment.apiUrl}/api/entrenamientos`;

  constructor(private http: HttpClient) {}


// =====================================
//               entrenamientos
// =====================================

getEntrenamientos(sede: string = ''): Observable<Entrenamiento[]> {
  let params: any = {};
  if (sede !== '') params.sede = sede;
  return this.http.get<Entrenamiento[]>(`${environment.apiUrl}/api/entrenamientos`, { params });
}

getEntrenamientosByClave(clave: string): Observable<Entrenamiento> {
  return this.http.get<Entrenamiento>(`${environment.apiUrl}/api/entrenamientos/${clave}`);
}

registrarEntrenamientos(formData: FormData): Observable<Entrenamiento> {
  return this.http.post<Entrenamiento>(`${environment.apiUrl}/api/entrenamientos`, formData);
}

actualizarEntrenamientos(clave: string, formData: FormData): Observable<Entrenamiento> {
  return this.http.post<Entrenamiento>(`${environment.apiUrl}/api/entrenamientos/${clave}?_method=PUT`, formData);
}

eliminarEntrenamientos(clave: string): Observable<any> {
  return this.http.delete<any>(`${environment.apiUrl}/api/entrenamientos/${clave}`);
}
}
