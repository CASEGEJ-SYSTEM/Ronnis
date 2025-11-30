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

  // Fecha de hoy en formato YYYY-MM-DD
  today: string = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

  // Recuperar sede del usuario logueado
  sede = localStorage.getItem('sede') ?? '';

  usuario = {
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    telefono: '',
    email: '',
    fecha_inscripcion: this.today,
    fecha_corte: '',
    peso_inicial: ''  
  };

  constructor(private usuarioService: UsuarioService) {
    const { fechaPago, tipo_pago } = this.calcularFechaPago(new Date());
    this.usuario.fecha_corte = fechaPago.toISOString().split('T')[0];
  }



registrarusuario() {
  const now = new Date();
  const { fechaPago, tipo_pago } = this.calcularFechaPago(now);

  this.usuario.fecha_inscripcion = this.today;
  this.usuario.fecha_corte = fechaPago.toISOString().split('T')[0];

  const payload = {
    nombres: this.usuario.nombres,
    apellidos: this.usuario.apellidos,
    fecha_nacimiento: this.usuario.fecha_nacimiento,
    telefono: this.usuario.telefono,
    email: this.usuario.email,
    password: this.usuario.email,
    fecha_inscripcion: this.usuario.fecha_inscripcion,
    fecha_corte: this.usuario.fecha_corte,
    tipo_pago: tipo_pago, // <-- aquí asignamos el tipo de pago
    sede: this.sede,
    status: "activo",
    rol : "cliente",
    ruta_imagen: null,
    qr_imagen: null,
    peso_inicial: this.usuario.peso_inicial
  };

  // REGISTRAR USUARIO
  this.usuarioService.registrarUsuario(payload).subscribe({
    next: (res) => {
      const clave = res.usuario.clave_usuario;

      // REGISTRA ASISTENCIA
      this.usuarioService.registrarAsistencia({
        clave_cliente: clave,
        fecha_diario: now.toISOString(),
      }).subscribe({
        next: () => {

          // REGISTRA PAGO
          this.usuarioService.registrarPago({
            clave_cliente: clave,
            fecha_ingreso: now.toISOString(),
            fecha_corte: fechaPago.toISOString(),
            Tipo_pago: tipo_pago, // <-- tipo de pago también en la tabla pagos
            monto_pendiente: 500
          }).subscribe({
            next: () => {
              alert('Usuario registrado correctamente.');
              this.limpiarFormulario();
            },
            error: () => alert('Error al registrar pago')
          });

        },
        error: () => alert('Error al registrar asistencia')
      });

    },
    error: (err) => {
      if (err.status === 422 && err.error?.errors?.email) {
        alert('El correo ya está registrado.');
      } else {
        alert('Error al registrar usuario');
      }
    }
  });
}

// CALCULAR FECHA DE PAGO
  private calcularFechaPago(fecha: Date): { fechaPago: Date, tipo_pago: string } {
    const day = fecha.getDate();
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();

    let fechaPago: Date;
    let tipo_pago: string;

    if (day >= 1 && day <= 6 || day >= 28) {
      fechaPago = day >= 28
        ? new Date(anio, mes + 1, 1)
        : new Date(anio, mes, 1);
      tipo_pago = 'Mensual';
    } else if (day >= 15 && day <= 21) {
      fechaPago = new Date(anio, mes, 15);
      tipo_pago = 'Quincenal';
    } else {
      // Por defecto, si no cae en los rangos, se considera mensual
      fechaPago = new Date(anio, mes + 1, 1);
      tipo_pago = 'Mensual';
    }

    return { fechaPago, tipo_pago };
  }

  get fechaCorteDia(): string {
    if (!this.usuario.fecha_corte) return '';
    const [anio, mes, dia] = this.usuario.fecha_corte.split('-');
    return `${dia}`;
  }


  limpiarFormulario() {
    this.usuario = {
      nombres: '',
      apellidos: '',
      fecha_nacimiento: '',
      telefono: '',
      email: '',
      fecha_inscripcion: this.today,  
      fecha_corte: this.usuario.fecha_corte,
      peso_inicial: '',
    };
  }


}
