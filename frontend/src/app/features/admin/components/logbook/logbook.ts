import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@Component({
  selector: 'app-logbook',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logbook.html',
  styleUrl: './logbook.css',
})
export class Logbook implements OnInit {

  financialLogData: any[] = [];
  debtorsData: any[] = [];
  arrivalsData: any[] = [];
  usersData: any[] = [];

  filtroStatus = '';
  sede = localStorage.getItem('sede') ?? '';

  fechaHoraActual = signal(new Date());
  currentSubView = signal('ganancias'); // vista inicial

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarIngresos();

    setInterval(() => {
      this.fechaHoraActual.set(new Date());
    }, 1000);
  }

  
  setSubView(view: string) {
    this.currentSubView.set(view);
  }

  filtrar(status: string) {
    this.filtroStatus = status;
  }

  cargarUsuarios() {
    this.usuarioService.getUsuariosPorSede(this.sede).subscribe({
      next: (data) => {
        this.usersData = data.filter(
          (u: any) => u.rol !== 'admin' && u.rol !== 'superadmin'
        );
      },
      error: (err) => console.error('Error al cargar usuarios:', err),
    });
  }

  cargarIngresos() {
    this.usuarioService.getBitacoraIngresos().subscribe({
      next: (resp) => {
        this.financialLogData = resp.data ?? [];
        console.log("Ingresos:", this.financialLogData);
      },
      error: (err) => console.error(err)
    });
  }


  deleteUser(user: any) {
    const isConfirmed = confirm(
      `¿Estás seguro de que deseas marcar como eliminado a ${user.nombres}?`
    );
    if (!isConfirmed) return;

    this.usuarioService.eliminarUsuario(user.clave_usuario).subscribe({
      next: () => {
        alert(`${user.nombres} fue marcado como eliminado.`);
        this.usersData = this.usersData.filter(
          (u) => u.clave_usuario !== user.clave_usuario
        );
      },
      error: (err) => {
        console.error('Error al marcar como eliminado:', err);
        alert('Ocurrió un error al eliminar al usuario.');
      },
    });
  }

  busqueda = '';

  get usersFiltrados() {
    return this.usersData.filter((user) => {
      if (user.status === 'pendiente' || user.status === 'proximo a vencer')
        return false;

      const pasaStatus =
        !this.filtroStatus ||
        (this.filtroStatus === 'sin asignar'
          ? !user.status ||
            user.status === '' ||
            user.status === 'ninguno' ||
            user.status === 'sin asignar'
          : user.status === this.filtroStatus);

      if (!pasaStatus) return false;

      const texto = this.busqueda.toLowerCase();

      return (
        user.clave_usuario?.toString().toLowerCase().includes(texto) ||
        `${user.nombres} ${user.apellidos}`.toLowerCase().includes(texto) ||
        user.status?.toLowerCase().includes(texto) ||
        user.fecha_corte?.toLowerCase().includes(texto) ||
        user.monto_recargo?.toLowerCase().includes(texto) ||
        user.telefono?.toLowerCase().includes(texto) ||
        user.correo?.toLowerCase().includes(texto) ||
        (!user.status && texto.includes('sin asignar'))
      );
    });
  }
}
