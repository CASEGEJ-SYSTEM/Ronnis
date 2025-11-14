import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../../core/services/cliente.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-user-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './user-detail.html',
    styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit {
    user: any = null;
    id!: number;

    constructor(
        private route: ActivatedRoute,
        private clienteService: ClienteService
    ) {}

    calcularDiasPagados(fechaPago: string): number {
        const hoy = new Date();
        const fecha = new Date(fechaPago);

        const diferencia = fecha.getTime() - hoy.getTime();
        const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

        return dias >= 0 ? dias : 0;
    }

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));

        this.clienteService.getClienteById(this.id).subscribe({
            next: (data) => {
                this.user = data;

                // Asegurar que existe la fecha
                if (this.user?.fecha_pago) {
                    this.user.diasPagados = this.calcularDiasPagados(this.user.fecha_pago);
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