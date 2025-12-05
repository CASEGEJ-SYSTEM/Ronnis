import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrenamientosService } from '../../../../core/services/entrenamientos.service';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Entrenamiento } from '../../../../core/models/training.model';

@Component({
    selector: 'app-entrenamientos',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './entrenamientos.html',
})
export class Entrenamientos implements OnInit {

    entrenamientosData: Entrenamiento[] = [];
    sede = localStorage.getItem('sede') ?? '';

    @ViewChild('carousel') carousel!: ElementRef;

    constructor(
        private entrenamientosService: EntrenamientosService
    ) {}

    ngOnInit() {
        this.cargarEntrenamientos();
    }

cargarEntrenamientos() {
    this.entrenamientosService.getEntrenamientos('').subscribe({
        next: (data) => {
            if (!Array.isArray(data)) {
                console.error("El backend NO regresó un array:", data);
                this.entrenamientosData = [];
                return;
            }

            this.entrenamientosData = data.map((p: Entrenamiento) => ({
                ...p,
                ruta_imagen: p.ruta_imagen
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
        if (!confirm("¿Eliminar este Entrenamientos?")) return;

        this.entrenamientosService.eliminarEntrenamientos(clave).subscribe({
            next: () => this.entrenamientosData = this.entrenamientosData.filter(
                x => x.clave_entrenamientos !== clave
            )
        });
    }


}
