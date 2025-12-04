import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-clients-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './clients-profile.html',
  styleUrls: ['./clients-profile.css']
})
export class ClientsProfile implements OnInit {

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
    this.clave_usuario = this.route.parent?.snapshot.paramMap.get('clave_usuario') ?? '';
    this.cargarUsuario(this.clave_usuario);

  }

  cargarUsuario(clave_usuario: string) {
    this.usuarioService.getUsuarioByClave(clave_usuario).subscribe({
        next: (data) => {
          this.user = data;

          if (this.user?.ruta_imagen) {
              this.user.ruta_imagen = `${environment.apiUrl}/${this.user.ruta_imagen}`;
          }
        }
    });

  }

  guardarCambios() {


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
