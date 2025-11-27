import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-trainer-management',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './trainer-management.html',
})
export class TrainerManagement implements OnInit {

    trainersData: any[] = [];
    sede = localStorage.getItem('sede') ?? '';

    @ViewChild('carousel') carousel!: ElementRef;

    constructor(
        private usuarioService: UsuarioService
    ) {}

    ngOnInit() {
        this.cargarPersonal();
    }

cargarPersonal() {
    this.usuarioService.getPersonal('').subscribe({
        next: (data) => {
            if (!Array.isArray(data)) {
                console.error("El backend NO regresó un array:", data);
                this.trainersData = [];
                return;
            }

            this.trainersData = data.map((p: any) => ({
                clave_personal: p.clave_personal,
                name: p.nombre_completo,
                puesto: p.puesto,
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
        if (!confirm("¿Eliminar este personal?")) return;

        this.usuarioService.eliminarPersonal(clave).subscribe({
            next: () => this.trainersData = this.trainersData.filter(
                x => x.clave_personal !== clave
            )
        });
    }


}
