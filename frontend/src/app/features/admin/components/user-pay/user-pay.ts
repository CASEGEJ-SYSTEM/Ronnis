import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { QrCodeModal } from '../../../../shared/components/qr-code-modal/qr-code-modal';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

@Component({
  selector: 'app-user-pay',
  standalone: true,
  imports: [CommonModule, RouterLink, QrCodeModal],
  templateUrl: './user-pay.html',
  styleUrls: ['./user-pay.css']
})
export class UserPay implements OnInit {
  usersData: any[] = [];
  selectedUserForQr = signal<any | null>(null);

  // signal para fecha y hora
  fechaHoraActual = signal(new Date());

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

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usersData = data,
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
    const isConfirmed = confirm(`¿Estás seguro de que deseas eliminar a ${user.nombres}?`);
    if (!isConfirmed) return;

    this.usuarioService.eliminarUsuario(user.clave_usuario).subscribe({
      next: () => {
        alert(`${user.nombres} ha sido eliminado correctamente.`);
        this.usersData = this.usersData.filter(u => u.clave_usuario !== user.clave_usuario);
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
        alert('Ocurrió un error al eliminar al usuario.');
      }
    });
  }
}
