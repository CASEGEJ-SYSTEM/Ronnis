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
    if (formValue.password !== formValue.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (formValue.password.length < 6) {
      alert('La contraseña debe tener mínimo 6 caracteres');
      return;
    }

    const payload = {
      nombres: formValue.firstName,
      apellidos: formValue.lastName,
      fecha_nacimiento: formValue.birthDate,
      telefono: formValue.phone,
      email: formValue.email,
      password: formValue.password, 
      sede: "ninguno", 
      status: "pendiente",               
      ruta_imagen: null,
      qr_imagen: null
    };

    console.log('Registrando usuario con rol:', payload);

    this.http.post(`${environment.apiUrl}/api/usuarios`, payload).subscribe({
      next: (res: any) => {
        alert('Registro exitoso. Espera la activación de tu cuenta.');
        this.router.navigate(['/auth/login']);
      },
     error: (error) => {
      let mensaje = 'Error inesperado, intenta nuevamente.';
      
      if (error.status === 422 && error.error?.errors?.email) {
        mensaje = 'El correo ya está registrado.';
      }
      
      alert(mensaje);
      console.error(error);
    }

    });
  }
}
