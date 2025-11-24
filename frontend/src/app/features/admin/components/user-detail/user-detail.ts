import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.css']
})
export class UserDetail implements OnInit {

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
  ngOnInit() {
    this.clave_usuario = String(this.route.snapshot.paramMap.get('clave_usuario'));

    this.usuarioService.getUsuarioByClave(this.clave_usuario).subscribe({
      next: (data) => {
        this.user = data;

        if (this.user?.fecha_corte) {
          this.user.diasPagados = this.calcularDiasPagados(this.user.fecha_corte);
        } else {
          this.user.diasPagados = 0;
        }
      },
      error: (err) => {
        console.error('Error al cargar usuario:', err);
      }
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
