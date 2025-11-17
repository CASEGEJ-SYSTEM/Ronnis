import { Component } from '@angular/core';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-registration.html',
  styleUrls: ['./client-registration.css']
})
export class ClientRegistration {

  today: string = new Date().toISOString().split('T')[0];

  usuario = {
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    telefono: '',
    email: '',
    fecha_inscripcion: this.today,
    fecha_corte: ''
  };

  constructor(private usuarioService: UsuarioService) {}

  registrarusuario() {
    const now = new Date();
    const fechaCorte = this.calcularFechaPago(now);

    // Forzar fechas automáticas
    this.usuario.fecha_inscripcion = this.today;
    this.usuario.fecha_corte = fechaCorte.toISOString().split('T')[0];

    const usuarioData = {
      nombres: this.usuario.nombres,
      apellidos: this.usuario.apellidos,
      fecha_nacimiento: this.usuario.fecha_nacimiento,
      telefono: this.usuario.telefono,
      email: this.usuario.email,
      password: this.usuario.email, // contraseña = email
      fecha_inscripcion: this.usuario.fecha_inscripcion,
      fecha_corte: this.usuario.fecha_corte,
      sede: 'Principal',
      ruta_imagen: '',
      qr_imagen: ''
    };

    this.usuarioService.registrarUsuario(usuarioData).subscribe({
      next: (resusuario) => {
        const usuario_id = resusuario.usuario.id;

        this.usuarioService.registrarUsuario({
          usuario_id: usuario_id,
          fecha_ingreso: now.toISOString(),
          fecha_pago: fechaCorte.toISOString()
        }).subscribe();

        this.usuarioService.registrarPago({
          usuario_id: usuario_id,
          fecha: now.toISOString(),
          monto_pendiente: 0
        }).subscribe();

        alert('Usuario registrado correctamente.');
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar usuario');
      }
    });
  }

  private calcularFechaPago(fecha: Date): Date {
    const day = fecha.getDate();
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();
    let fechaPago: Date;

    if (day >= 28 || day <= 6) {
      fechaPago = day >= 28
        ? new Date(anio, mes + 1, 1)
        : new Date(anio, mes, 1);
    } else if (day >= 15 && day <= 21) {
      fechaPago = new Date(anio, mes, 15);
    } else {
      fechaPago = new Date(anio, mes + 1, 1);
    }

    return fechaPago;
  }
}
