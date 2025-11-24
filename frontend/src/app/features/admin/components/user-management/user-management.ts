import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { QrCodeModal } from '../../../../shared/components/qr-code-modal/qr-code-modal';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
registerLocaleData(localeEs);

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, QrCodeModal],

  templateUrl: './user-management.html',
  styleUrls: ['./user-management.css']
})
export class UserManagement implements OnInit {
  filtroStatus = '';
  usersData: any[] = [];
  selectedUserForQr = signal<any | null>(null);

  // signal para fecha y hora
  fechaHoraActual = signal(new Date());

  sede = localStorage.getItem('sede') ?? ''; 

  trackByUserId(index: number, user: any) {
    return user.clave_usuario || index;
  }

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.cargarUsuarios();

    // actualizar fecha y hora cada segundo
    setInterval(() => {
      this.fechaHoraActual.set(new Date());
    }, 1000);
  }

  filtrar(status: string) {
    this.filtroStatus = status;
  }

  cargarUsuarios() {
    this.usuarioService.getUsuariosPorSede(this.sede).subscribe({
      next: (data) => {

        // FILTRA ADMIN Y SUPERADMIN
        this.usersData = data.filter(
          (u: any) => u.rol !== 'admin' && u.rol !== 'superadmin'
        );

      },
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }




  showQrModal(user: any) {
    this.selectedUserForQr.set(user);
  }

  closeQrModal() {
    this.selectedUserForQr.set(null);
  }

  deleteUser(user: any) {
    const isConfirmed = confirm(`¿Estás seguro de que deseas marcar como eliminado a ${user.nombres}?`);
    if (!isConfirmed) return;

    this.usuarioService.eliminarUsuario(user.clave_usuario).subscribe({
      next: () => {
        alert(`${user.nombres} fue marcado como eliminado.`);
        this.usersData = this.usersData.filter(u => u.clave_usuario !== user.clave_usuario);
      },
      error: (err) => {
        console.error('Error al marcar como eliminado:', err);
        alert('Ocurrió un error al eliminar al usuario.');
      }
    });
  }


  busqueda = '';

  get usersFiltrados() {
    return this.usersData.filter(user => {

      // FILTRO POR STATUS
      const pasaStatus =
        !this.filtroStatus ||
        (this.filtroStatus === 'pendiente'
          ? !user.status || user.status === '' || user.status === 'ninguno' || user.status === 'pendiente'
          : user.status === this.filtroStatus);


      if (!pasaStatus) return false;

      // FILTRO DE BÚSQUEDA
      const texto = this.busqueda.toLowerCase();

      return (
        user.clave_usuario?.toString().toLowerCase().includes(texto) ||
        `${user.nombres} ${user.apellidos}`.toLowerCase().includes(texto) ||
        user.status?.toLowerCase().includes(texto) ||
        (!user.status && texto.includes('pendiente'))
      );
    });
  }


}
