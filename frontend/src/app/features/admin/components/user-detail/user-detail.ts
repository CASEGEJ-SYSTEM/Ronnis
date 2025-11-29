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

        if (this.user?.ruta_imagen) {
          this.user.ruta_imagen = `${environment.apiUrl}/${this.user.ruta_imagen}`;
        }

        this.user.sede = this.sede[0];
      }
    });
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

  // ------------ CALCULAR FECHA DE PAGO IGUAL QUE REGISTRO -----------------
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
      fechaPago = new Date(anio, mes + 1, 1);
      tipo_pago = 'Mensual';
    }

    return { fechaPago, tipo_pago };
  }

  
  guardarCambios() {
    const hoy = new Date();

    // Si NO tiene registro en pagos → CREARLO
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
        next: () => {
          console.log("Pago inicial creado");
          this.actualizarUsuario();
        },
        error: () => alert("Error al crear pago inicial")
      });

      return;
    }

    // Si ya tenía pago → solo actualizar usuario
    this.actualizarUsuario();
  }

  private actualizarUsuario() {
    this.usuarioService.actualizarUsuario(this.clave_usuario, this.user)
      .subscribe({
        next: () => alert("Usuario actualizado"),
        error: () => alert("Error al actualizar usuario")
      });
  }

  // ---------- BUSQUEDA -------------------
  buscar() {
    if (this.busqueda.trim().length < 2) {
      this.resultadosBusqueda = [];
      return;
    }

    this.usuarioService.buscarUsuariosDeSede(this.busqueda, this.user?.sede).subscribe({
      next: (data: any[]) => this.resultadosBusqueda = data
    });
  }

  seleccionarUsuario(usuario: any) {
    this.resultadosBusqueda = [];
    this.busqueda = usuario.nombres;
    this.busqueda = '';   
    this.clave_usuario = usuario.clave_usuario;

    this.cargarUsuario(this.clave_usuario);
    this.cargarPago(this.clave_usuario);
  }

  subirFoto(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const formData = new FormData();
    formData.append('foto', archivo);

    this.usuarioService.subirFoto(this.clave_usuario, formData)
      .subscribe({
        next: (resp: any) => {
          this.user.ruta_imagen = `${environment.apiUrl}/${resp.ruta_imagen}`;
          alert("Foto actualizada");
        }
      });
  }

}
