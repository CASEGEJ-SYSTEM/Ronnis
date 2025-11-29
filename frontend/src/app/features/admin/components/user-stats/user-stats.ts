import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-user-stats',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-stats.html',
  styleUrls: ['./user-stats.css']

})
export class UserStats implements OnInit {

  user: any = null;
  pago: any = null;
  clave_usuario!: string;

  // Variables de búsqueda
  busqueda: string = '';
  resultadosBusqueda: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.clave_usuario = this.route.snapshot.paramMap.get('clave_usuario') ?? '';
 if (this.user?.ruta_imagen) {
       
      }
    if (!this.clave_usuario) {
      console.error("No se recibió clave_usuario en la ruta");
      return;
    }

    this.cargarUsuario(this.clave_usuario);
    this.cargarPagos(this.clave_usuario);
  }

  // ================================
  //      CARGA DE DATOS
  // ================================
    cargarUsuario(clave_usuario: string) {
    this.usuarioService.getUsuarioByClave(clave_usuario).subscribe({
        next: (data) => {
        this.user = data;

        if (this.user?.ruta_imagen) {
            this.user.ruta_imagen = `${environment.apiUrl}/${this.user.ruta_imagen}`;
        }
        },
        error: (err) => console.error('Error al cargar usuario:', err)
    });
    }


  cargarPagos(clave_usuario: string) {
    this.usuarioService.getPagosByClave(clave_usuario).subscribe({
      next: (data: any) => this.pago = data,
      error: (err) => console.error('Error al cargar pago:', err)
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
    this.busqueda = '';   
    this.clave_usuario = usuario.clave_usuario;

    this.cargarUsuario(this.clave_usuario);
    this.cargarPagos(this.clave_usuario);
    }

}
