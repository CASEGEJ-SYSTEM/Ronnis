import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstalacionesService } from '../../../../core/services/instalaciones.service';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-instalaciones',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './instalaciones.html',
})
export class Instalaciones implements OnInit {

    instalacionesData: any[] = [];
    sede = localStorage.getItem('sede') ?? '';

    @ViewChild('carousel') carousel!: ElementRef;

    constructor(
        private instalacionesService: InstalacionesService
    ) {}

    ngOnInit() {
        this.cargarinstalaciones();
    }

cargarinstalaciones() {
    this.instalacionesService.getInstalaciones('').subscribe({
        next: (data) => {
            if (!Array.isArray(data)) {
                console.error("El backend NO regresó un array:", data);
                this.instalacionesData = [];
                return;
            }

            this.instalacionesData = data.map((p: any) => ({
                clave_instalaciones: p.clave_instalaciones,
                titulo: p.titulo,
                description: p.descripcion ?? '',
                image: p.ruta_imagen
                    ? `${environment.apiUrl}/${p.ruta_imagen}`
                    : 'assets/no-image.png'
            }));
        }
    });
}


    scrollLeft() {
        this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }

    scrollRight() {
        this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }

    eliminar(clave: string) {
        if (!confirm("¿Eliminar este instalaciones?")) return;

        this.instalacionesService.eliminarInstalaciones(clave).subscribe({
            next: () => this.instalacionesData = this.instalacionesData.filter(
                x => x.clave_instalaciones !== clave
            )
        });
    }


}
