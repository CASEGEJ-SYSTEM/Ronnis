import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = `${environment.apiUrl}/api/clientes`;
  private registroUrl = `${environment.apiUrl}/api/registro-clientes`;
  private pagosUrl = `${environment.apiUrl}/api/pagos`;

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🔥 AGREGADO — Obtener cliente por ID
  getClienteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  registrarCliente(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  registrarRegistroCliente(data: any): Observable<any> {
    return this.http.post<any>(this.registroUrl, data);
  }

  registrarPago(data: any): Observable<any> {
    return this.http.post<any>(this.pagosUrl, data);
  }

  buscarClientes(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar`, { params });
  }

  actualizarCliente(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  eliminarCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
