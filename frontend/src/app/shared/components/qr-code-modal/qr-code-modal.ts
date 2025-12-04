import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-qr-code-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './qr-code-modal.html',
})
export class QrCodeModal {
    @Input() user: any;
    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }

    getQRUrl() {
        if (!this.user?.qr_imagen) return '';
        return environment.apiUrl + '/' + this.user.qr_imagen;
    }


async downloadQR() {
    if (!this.user?.qr_imagen) return;

    const filename = this.user.qr_imagen.split('/').pop();
    const fileUrl = `http://127.0.0.1:8000/${this.user.qr_imagen}`;


    try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('Error al descargar el QR');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.user.nombres || 'qr'}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al descargar QR:', error);
    }
}
}
