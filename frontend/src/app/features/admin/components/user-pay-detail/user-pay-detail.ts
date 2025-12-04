import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-user-pay-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-pay-detail.html',
  styleUrls: ['./user-pay-detail.css']
})
export class UserPayDetail implements OnInit {

  user: any = {};
  pago: any = {};
  clave_usuario!: string;

  busqueda: string = '';
  resultadosBusqueda: any[] = [];

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
      next: (data: any) => {
        this.user = data || {};
        if (this.user?.ruta_imagen) {
          this.user.ruta_imagen = `${environment.apiUrl}/${this.user.ruta_imagen}`;
        }
      }
    });
  }

  cargarPago(clave_usuario: string) {
    this.usuarioService.getPagosByClave(clave_usuario).subscribe({
      next: (data: any) => {
        this.pago = data || {};

        this.pago.monto_pagado = Number(this.pago.monto_pagado ?? 0);
        this.pago.monto_pendiente = Number(this.pago.monto_pendiente ?? 500);

        this.calcularProximoCorte();
        this.calcularSaldoMostrado();
      }
    });
  }

  // -------- SALDO MOSTRADO --------
  calcularSaldoMostrado() {
    if (!this.pago.fecha_corte) return;

    const corte = new Date(this.pago.fecha_corte);
    const hoy = new Date();
    const diff = (corte.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);

    if (diff <= 5 && this.pago.monto_pendiente === 0) {
      this.pago.saldo_mostrar = 500;
    } else {
      this.pago.saldo_mostrar = this.pago.monto_pendiente;
    }
  }

  calcularProximoCorte() {
      if (!this.pago.fecha_corte) return;

      const fechaCorte = new Date(this.pago.fecha_corte);
      const monto = this.pago.monto_pagado ?? 0;

      // Si no ha pagado nada → no mover fecha
      if (monto === 0) {
          this.pago.proximo_corte = fechaCorte;
          return;
      }

      // Calcular cuántos meses avanza según el monto pagado
      const meses = Math.floor(monto / 500);

      // Crear nueva fecha respetando el día de corte
      const nuevaFecha = new Date(fechaCorte);
      const diaOriginal = fechaCorte.getDate(); // Guardamos el día original
      nuevaFecha.setMonth(nuevaFecha.getMonth() + meses);

      // Ajustamos el día al original
      nuevaFecha.setDate(diaOriginal);

      this.pago.proximo_corte = nuevaFecha;
  }



  // -------- AL EDITAR MONTO --------
  onMontoPagadoChange(value: any) {
    const monto = Number(value ?? 0);
    this.pago.monto_pagado = monto;

    const nuevoSaldo = this.pago.monto_pendiente - monto;
    this.pago.monto_pendiente = nuevoSaldo >= 0 ? nuevoSaldo : 0;

    this.calcularProximoCorte();
    this.calcularSaldoMostrado();
  }

  // -------- GUARDAR --------
  mensaje: string = '';

  guardarCambios() {
    const payload = {
      monto_pagado: this.pago.monto_pagado,
      monto_pendiente: this.pago.monto_pendiente,
      fecha_corte: this.pago.proximo_corte.toISOString()
    };

    this.usuarioService.actualizarPago(this.clave_usuario, payload).subscribe({
      next: (res: any) => {
        this.mensaje = res.message; 
        setTimeout(() => this.mensaje = '', 3000); 
        this.cargarPago(this.clave_usuario);
      }
    });
  }


  // -------- BÚSQUEDA --------
  buscar() {
    if (this.busqueda.trim().length < 2) {
      this.resultadosBusqueda = [];
      return;
    }

    this.usuarioService.buscarUsuariosDeSede(this.busqueda, this.user?.sede || '')
      .subscribe(data => this.resultadosBusqueda = data);
  }

  seleccionarUsuario(usuario: any) {
    this.resultadosBusqueda = [];
    this.busqueda = usuario.nombres;
    this.busqueda = '';
    this.clave_usuario = usuario.clave_usuario;
    this.cargarUsuario(usuario.clave_usuario);
    this.cargarPago(usuario.clave_usuario);
  }

}
