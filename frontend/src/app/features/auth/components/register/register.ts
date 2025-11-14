import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  today: string = new Date().toISOString().split('T')[0];

  constructor(private http: HttpClient, private router: Router) {}

  handleRegister(formValue: any) {
    // Validar contraseñas
    if (formValue.password !== formValue.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Estructura del payload (debe coincidir con Laravel)
    const payload = {
      nombres: formValue.firstName,
      apellidos: formValue.lastName,
      fecha_nacimiento: formValue.birthDate,
      telefono: formValue.phone,
      email: formValue.email,
      contraseña: formValue.password, // Laravel espera este campo literal
      sede: formValue.sede || 'principal', // opcional
      ruta_imagen: null,
      qr_imagen: null
    };

    console.log('Enviando datos:', payload);

    // Enviar la petición al backend de Laravel
    this.http.post(`${environment.apiUrl}/api/clientes`, payload).subscribe({
      next: (response: any) => {
        console.log('Respuesta del servidor:', response);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Error al registrar:', error);

        // Validación del frontend
        if (formValue.password.length < 6) {
          alert('La contraseña debe tener al menos 6 caracteres');
          return;
        }

        // Manejo de errores comunes
        if (error.status === 422) {
          alert('Error de validación. Verifica los datos ingresados.');
        } else if (error.status === 0) {
          alert('No se pudo conectar con el servidor. Verifica que Laravel esté corriendo.');
        } else if (error.error?.message) {
          alert(error.error.message);
        } else {
          alert('Ocurrió un error inesperado. Intenta nuevamente.');
        }
      }
    });
  }
}
