import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

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
}