import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../../environments/environment'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule], 
  templateUrl: './login.html',
})
export class Login {
  loginError = signal('');
  isLoading = signal(false);

  constructor(private router: Router, private http: HttpClient) {}

  handleLogin(credentials: any) {
    this.loginError.set('');
    this.isLoading.set(true);

    if (!credentials.email || !credentials.password) {
      this.loginError.set('Por favor ingresa tu correo y contraseña.');
      this.isLoading.set(false);
      return;
    }

    const payload = {
      email: credentials.email,
      password: credentials.password
    };


    this.http.post(`${environment.apiUrl}/api/login`, payload).subscribe({
      next: (response: any) => {
        this.isLoading.set(false);

        // Guardar datos del usuario
        localStorage.setItem('usuario', JSON.stringify(response.usuario));
        localStorage.setItem('rol', response.rol);

        const rol = response.rol;

        if (rol === 'administrador' || rol === 'admin') {
          this.router.navigate(['/admin']);
        } else if (rol === 'cliente') {
          this.router.navigate(['/home']);
        } else {
          this.loginError.set('Rol no reconocido.');
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        if (error.status === 401) {
          this.loginError.set('Correo o contraseña incorrectos.');
        } else if (error.status === 0) {
          this.loginError.set('No se pudo conectar con el servidor.');
        } else {
          this.loginError.set('Ocurrió un error inesperado.');
        }
      }
    });
  }
}
