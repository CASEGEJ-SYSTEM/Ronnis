import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-pay-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-pay-detail.html',
  styleUrls: ['./user-pay-detail.css']
})
export class UserPayDetail implements OnInit {

  user: any = null;
  clave_usuario!: string;
  // Variables de búsqueda
  busqueda: string = '';
  resultadosBusqueda: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  calcularDiasPagados(fechaPago: string): number {
    const hoy = new Date();
    const fecha = new Date(fechaPago);

    const diferencia = fecha.getTime() - hoy.getTime();
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

    return dias >= 0 ? dias : 0;
  }

   cargarUsuario(clave_usuario: string) {
    this.usuarioService.getUsuarioByClave(clave_usuario).subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Error al cargar usuario:', err)
    });
  } 

// user-pay-detail.component.ts
calcularSaldoYProximoCorte(usuario: any) {
  if (!usuario.fecha_ingreso || !usuario.fecha_corte) return { saldo: 0, proximoCorte: null };

  const fechaIngreso = new Date(usuario.fecha_ingreso);
  const fechaCorte = new Date(usuario.fecha_corte);

  // Saldo a pagar según día del mes
  const dia = fechaIngreso.getDate();
  let saldo = 0;
  if (dia >= 28 || dia <= 14) {
    saldo = 500;
  } else if (dia >= 15 && dia <= 27) {
    saldo = 800;
  }

  // Próximo corte: sumar 1 mes a la fecha de corte actual
  const proximoCorte = new Date(fechaCorte);
  proximoCorte.setMonth(fechaCorte.getMonth() + 1);

  return { saldo, proximoCorte };
}

ngOnInit() {
  this.clave_usuario = String(this.route.snapshot.paramMap.get('clave_usuario'));

  this.usuarioService.getUsuarioByClave(this.clave_usuario).subscribe({
    next: (data) => {
      this.user = data;

      // Calcular días pagados
      this.user.diasPagados = this.user.fecha_corte ? this.calcularDiasPagados(this.user.fecha_corte) : 0;

      // Calcular saldo y próximo corte
      const { saldo, proximoCorte } = this.calcularSaldoYProximoCorte(this.user);
      this.user.saldoPagar = saldo;
      this.user.proximoCorte = proximoCorte;
    },
    error: (err) => console.error('Error al cargar usuario:', err)
  });
}

  guardarCambios() {
    if (!this.user) return;

    this.usuarioService.actualizarUsuario(this.clave_usuario, this.user)
      .subscribe({
        next: () => alert("Usuario actualizado"),
        error: err => console.error(err)
      });
  }

    buscar() {
    if (this.busqueda.trim().length < 2) {
        this.resultadosBusqueda = [];
        return;
    }

    this.usuarioService.buscarUsuariosDeSede(this.busqueda, this.user?.sede).subscribe({
        next: (data: any[]) => this.resultadosBusqueda = data,
        error: (err: any) => console.error('Error en búsqueda:', err)
    });
    }

    seleccionarUsuario(usuario: any) {
    this.resultadosBusqueda = [];
    this.busqueda = usuario.nombres;
    this.clave_usuario = usuario.clave_usuario;

    this.cargarUsuario(this.clave_usuario);
    }

}
