import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.css']
})
export class UserDetail implements OnInit {
  extensiones = [
    '+52', '+1', '+44', '+33', '+49', '+34',
    '+55', '+54', '+81', '+82', '+86'
  ];

  telefonoExtension = '+52';
  user: any = null;
  pago: any = null; 
  clave_usuario!: string;

  busqueda: string = '';
  resultadosBusqueda: any[] = [];

  sede = localStorage.getItem('sede')?.split(',') || [];

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.clave_usuario = String(this.route.snapshot.paramMap.get('clave_usuario'));

    this.cargarUsuario(this.clave_usuario);
    this.cargarPago(this.clave_usuario);
  }

  cargarUsuario(clave_usuario: string) {
    this.usuarioService.getUsuarioByClave(clave_usuario).subscribe({
      next: (data) => {
        this.user = data;

        // Mostrar imagen
        this.user.ruta_imagen_mostrar = this.user.ruta_imagen
          ? `${environment.apiUrl}/${this.user.ruta_imagen}`
          : null;

        this.user.sede = this.sede[0];

        if (this.user.telefono) {
          const partes = this.user.telefono.split(" ");

          // Si viene "+52 1234567890"
          if (partes.length > 1) {
            this.telefonoExtension = partes[0];    // "+52"
            this.user.telefono = partes.slice(1).join(" "); // "1234567890"
          } else {
            // Si viene sin extensión
            this.user.telefono = this.user.telefono.replace(/\D/g, '');
          }
        }

        if (this.user.peso_inicial) {
          this.user.peso_inicial = this.user.peso_inicial
            .toString()
            .replace(/kg/i, '')     // Quitar "kg" sin importar mayúsculas
            .trim();
        }
      }
    });
  }


  buscar() {
    if (this.busqueda.trim().length < 2) {
      this.resultadosBusqueda = [];
      return;
    }

    this.usuarioService.buscarUsuariosDeSede(this.busqueda, this.user?.sede).subscribe({
      next: (data: any[]) => {
        this.resultadosBusqueda = data;
      },
      error: () => {
        this.resultadosBusqueda = [];
      }
    });
  }

  seleccionarUsuario(usuario: any) {
    this.resultadosBusqueda = [];
    this.busqueda = usuario.nombres + ' ' + usuario.apellidos;
    this.clave_usuario = usuario.clave_usuario;

    this.cargarUsuario(this.clave_usuario);
    this.cargarPago(this.clave_usuario);
  }

  cargarPago(clave_usuario: string) {
    this.usuarioService.getPagosByClave(clave_usuario).subscribe({
      next: (data) => {
        this.pago = data || null;
      },
      error: () => {
        this.pago = null;
      }
    });
  }

  guardarCambios() {
      const hoy = new Date();

      // ---------------------------
      // Peso inicial → mantener string + agregar "Kg" si falta
      // ---------------------------
      let pesoFinal = this.user.peso_inicial?.trim() || '';

      if (pesoFinal !== '' && !pesoFinal.toLowerCase().includes('kg')) {
          pesoFinal = `${pesoFinal} Kg`;
      }
      this.user.peso_inicial = pesoFinal;

      // ---------------------------
      // Nombres y apellidos
      // ---------------------------
      this.user.nombres = this.user.nombres?.trim().toLowerCase() || '';
      this.user.apellidos = this.user.apellidos?.trim().toLowerCase() || '';

      // ---------------------------
      // Teléfono
      // ---------------------------
      const numeroSolo = this.user.telefono?.replace(/\D/g, '') || '';
      this.user.telefono = this.telefonoExtension
          ? `${this.telefonoExtension} ${numeroSolo}`
          : numeroSolo;

      // ---------------------------
      // Objeto final
      // ---------------------------
      const usuarioActualizado = { ...this.user };

      if (!this.user.ruta_imagen) {
          usuarioActualizado.ruta_imagen = this.user.ruta_imagen_backup ?? null;
      }

      // Contraseña solo si se escribe
      if (!this.user.password || this.user.password.trim() === '') {
          delete usuarioActualizado.password;
      }

      // ---------------------------
      // Crear pago si no tiene sede
      // ---------------------------
      if (!this.user?.sede || this.user.sede === '' || this.user.sede === null) {
          const { fechaPago, tipo_pago } = this.calcularFechaPago(hoy);

          const dataPago = {
              clave_cliente: this.clave_usuario,
              fecha_ingreso: hoy.toISOString(),
              fecha_corte: fechaPago.toISOString(),
              Tipo_pago: tipo_pago,
              monto_pendiente: 500
          };

          this.usuarioService.registrarPago(dataPago).subscribe({
              next: () => this.actualizarUsuario(usuarioActualizado),
              error: () => alert("Error al crear el pago inicial")
          });
          return;
      }

      // ---------------------------
      // Crear pago si no existe
      // ---------------------------
      if (!this.pago) {
          const { fechaPago, tipo_pago } = this.calcularFechaPago(hoy);

          const dataPago = {
              clave_cliente: this.clave_usuario,
              fecha_ingreso: hoy.toISOString(),
              fecha_corte: fechaPago.toISOString(),
              Tipo_pago: tipo_pago,
              monto_pendiente: 500
          };

          this.usuarioService.registrarPago(dataPago).subscribe({
              next: () => this.actualizarUsuario(usuarioActualizado),
              error: () => alert("Error al crear el pago")
          });
          return;
      }

      // ---------------------------
      // Ya tiene pago → actualizar solo usuario
      // ---------------------------
      this.actualizarUsuario(usuarioActualizado);
  }

  
    actualizarUsuario(usuarioActualizado: any) {
      this.usuarioService.actualizarUsuario(this.clave_usuario, usuarioActualizado)
        .subscribe({
          next: () => {
            console.log("Usuario actualizado");
            alert("Datos guardados correctamente");
          },
          error: () => alert("Error al actualizar usuario")
        });
    }

  subirFoto(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const formData = new FormData();
    formData.append('foto', archivo);

    this.usuarioService.subirFoto(this.clave_usuario, formData)
      .subscribe({
        next: (resp: any) => {
          // Guardar ruta tal como devuelve el backend
          this.user.ruta_imagen = resp.ruta_imagen;
          this.user.ruta_imagen_backup = resp.ruta_imagen;

          // Solo para mostrar en la vista
          this.user.ruta_imagen_mostrar = `${environment.apiUrl}/${resp.ruta_imagen}`;

          alert("Foto actualizada");
        }
      });
  }

  private formatLocalDate(fecha: Date): string {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2,'0');
    const d = String(fecha.getDate()).padStart(2,'0');
    const h = String(fecha.getHours()).padStart(2,'0');
    const min = String(fecha.getMinutes()).padStart(2,'0');
    const s = String(fecha.getSeconds()).padStart(2,'0');
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
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
}
