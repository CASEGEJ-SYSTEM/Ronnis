import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MockDataService } from '../../../../core/services/mock-data.service';
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
    // Señal para controlar la visibilidad del modal y qué usuario mostrar
    selectedUserForQr = signal<any | null>(null);

    constructor(private mockData: MockDataService) { }

    ngOnInit() {
        this.usersData = this.mockData.getUsers();
    }

    showQrModal(user: any) {
        this.selectedUserForQr.set(user);
    }

    closeQrModal() {
        this.selectedUserForQr.set(null);
    }

    deleteUser(user: any) {
        const isConfirmed = confirm(`¿Estás seguro de que deseas eliminar a ${user.name}?`);
        if (isConfirmed) {
            console.log('Eliminando usuario:', user.name);
            alert(`${user.name} ha sido eliminado (simulación).`);
        }
    }
}