import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clients-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './clients-profile.html',
  styleUrls: ['./clients-profile.css']
})
export class ClientsProfile implements OnInit {

  user: any = null;
  clave_usuario!: string;

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
}
