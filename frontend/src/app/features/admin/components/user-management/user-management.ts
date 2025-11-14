import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../../../../app/core/services/cliente.service';
import { QrCodeModal } from '../../../../shared/components/qr-code-modal/qr-code-modal';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterLink, QrCodeModal],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement implements OnInit {
  usersData: any[] = [];
  selectedUserForQr = signal<any | null>(null);

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.usersData = data;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
      }
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

    this.clienteService.eliminarCliente(user.id).subscribe({
      next: () => {
        alert(`${user.nombres} ha sido eliminado correctamente.`);
        // Quitar del arreglo local para actualizar la vista
        this.usersData = this.usersData.filter(u => u.id !== user.id);
      },
      error: (err) => {
        console.error('Error al eliminar cliente:', err);
        alert('Ocurrió un error al eliminar al cliente.');
      }
    });
  }

}
