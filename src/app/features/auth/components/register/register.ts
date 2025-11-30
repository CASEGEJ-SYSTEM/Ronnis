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

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  handleRegister(formValue: any) {

    // Validaciones del lado del front
    if (formValue.password !== formValue.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (formValue.password.length < 6) {
      alert('La contraseña debe tener mínimo 6 caracteres');
      return;
    }

    // Payload que espera el backend
    const payload = {
      nombres            : formValue.firstName,
      apellidos          : formValue.lastName,
      fecha_nacimiento   : formValue.birthDate,
      telefono           : formValue.phone,
      email              : formValue.email,
      password           : formValue.password,
      
      // valores por defecto
      sede               : "ninguno",
      status             : "pendiente",
      rol                : "cliente",
      peso_inicial       : "0 kg",
      
      ruta_imagen        : null,
      qr_imagen          : null
    };

    console.log('Enviando registro:', payload);

    this.http.post(`${environment.apiUrl}/api/usuarios`, payload).subscribe({
      next: () => {
        alert('Registro exitoso. Espera la activación de tu cuenta.');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {

        let mensaje = 'Error inesperado, intenta nuevamente.';

        // Error 422 :(validación del backend)
        if (error.status === 422) {

          if (error.error?.errors?.email) {
            mensaje = 'El correo ya está registrado.';
          }

          if (error.error?.errors?.telefono) {
            mensaje = 'El teléfono no es válido.';
          }
        }

        alert(mensaje);
        console.error('[ERROR REGISTRO]', error);
      }
    });
  }
}
