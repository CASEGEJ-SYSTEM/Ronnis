import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    // 🔒 Validar contraseñas
    if (formValue.password !== formValue.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // 📦 Estructura del payload (igual que en Laravel)
    const payload = {
      nombres: formValue.firstName,
      apellidos: formValue.lastName,
      fecha_nacimiento: formValue.birthDate,
      telefono: formValue.phone,
      email: formValue.email,
      contraseña: formValue.password, // Laravel espera "contraseña"
      sede: 'principal', // o del formulario si lo agregas
      ruta_imagen: null, // 👈 por ahora vacío
      qr_imagen: null    // 👈 también vacío
    };

    console.log('📤 Enviando datos:', payload);

    this.http.post('http://localhost:8000/api/clientes', payload).subscribe({
      next: (response: any) => {
        console.log('✅ Respuesta del servidor:', response);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('❌ Error al registrar:', error);
        if (error.status === 422) {
          alert('Error de validación. Verifica los datos.');
        } else if (error.status === 0) {
          alert('No se pudo conectar con el servidor. ¿Está corriendo Laravel?');
        } else {
          alert('Ocurrió un error inesperado. Intenta nuevamente.');
        }
      }
    });
  }
}
