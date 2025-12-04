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

  extensiones = [
    '+52', '+1', '+44', '+33', '+49', '+34',
    '+55', '+54', '+81', '+82', '+86'
  ];

  telefonoExtension = '+52';

  // Fecha de hoy solo YYYY-MM-DD para mostrar en el input
  today: string = (() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  })();

  sede = localStorage.getItem('sede') ?? '';

  usuario = {
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    telefono: '',
    email: '',
    fecha_inscripcion: this.today, // solo para mostrar en input
    fecha_corte: '',               // para backend (con hora)
    peso_inicial: ''
  };

  constructor(private usuarioService: UsuarioService) {
    const { fechaPago } = this.calcularFechaPago(new Date());
    this.usuario.fecha_corte = this.formatLocalDate(fechaPago);
  }

  // Para backend: YYYY-MM-DD HH:MM:SS
  private formatLocalDate(fecha: Date): string {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2,'0');
    const d = String(fecha.getDate()).padStart(2,'0');
    const h = String(fecha.getHours()).padStart(2,'0');
    const min = String(fecha.getMinutes()).padStart(2,'0');
    const s = String(fecha.getSeconds()).padStart(2,'0');
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
  }


  registrarusuario() {
    const now = new Date();
    const { fechaPago, tipo_pago } = this.calcularFechaPago(now);

    const fechaInscripcionBackend = this.formatLocalDate(now);
    const fechaCorteBackend = this.formatLocalDate(fechaPago);

    let pesoFinal = this.usuario.peso_inicial?.trim() || '';
    if (pesoFinal !== '' && !pesoFinal.toLowerCase().includes('kg')) {
      pesoFinal = `${pesoFinal} Kg`;
    }

    const payload = {
      nombres: this.usuario.nombres,
      apellidos: this.usuario.apellidos,
      fecha_nacimiento: this.usuario.fecha_nacimiento,
      telefono: `${this.telefonoExtension} ${this.usuario.telefono}`,
      email: this.usuario.email,
      password: this.usuario.email,
      fecha_inscripcion: fechaInscripcionBackend,
      fecha_corte: fechaCorteBackend,
      tipo_pago: tipo_pago,
      sede: this.sede,
      status: "activo",
      rol: "cliente",
      ruta_imagen: null,
      qr_imagen: null,
      peso_inicial: pesoFinal
    };

    this.usuarioService.registrarUsuario(payload).subscribe({
      next: (res) => {
        const clave = res.usuario.clave_usuario;

        this.usuarioService.registrarAsistencia({
          clave_cliente: clave,
          fecha_diario: fechaInscripcionBackend,
        }).subscribe({
          next: () => {
            this.usuarioService.registrarPago({
              clave_cliente: clave,
              fecha_ingreso: fechaInscripcionBackend,
              fecha_corte: fechaCorteBackend,
              Tipo_pago: tipo_pago,
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

  private calcularFechaPago(fecha: Date): { fechaPago: Date, tipo_pago: string } {
    const day = fecha.getDate();
    const mes = fecha.getMonth();
    const anio = fecha.getFullYear();
    let fechaPago: Date;
    let tipo_pago: string;

    if ((day >= 1 && day <= 6) || day >= 28) {
      fechaPago = day >= 28 ? new Date(anio, mes + 1, 1) : new Date(anio, mes, 1);
      tipo_pago = 'Mensual';
    } else if (day >= 15 && day <= 21) {
      fechaPago = new Date(anio, mes, 15);
      tipo_pago = 'Quincenal';
    } else {
      fechaPago = new Date(anio, mes + 1, 1);
      tipo_pago = 'Mensual';
    }

    return { fechaPago, tipo_pago };
  }

  // Solo día para mostrar en el input de corte
  get fechaCorteDia(): string {
    if (!this.usuario.fecha_corte) return '';
    return this.usuario.fecha_corte.split(' ')[0].split('-')[2];
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
